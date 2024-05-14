<?php

namespace Tests\Feature;

use App\Models\File;
use App\Models\Like;
use App\Models\Post;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListPostTest extends TestCase
{
    private $user;
    private $posts;
    protected function setUp(): void
    {
        parent::setUp();
        //Create roles
        Role::factory(3)->create();
        User::factory()
            ->count(5)
            ->state(function (array $attributes) {
                return ['state' => '1'];
            })->create();
        $users = User::all();
        $users->each(function ($user) {
            // Crear y asociar los archivos al post
            if ($user->role_id == 2) {
                $user->posts()->saveMany([
                    Post::factory()->make(),
                    Post::factory()->make()
                ]);
            }
        });

        $posts = Post::all();
        $posts->each(function ($post) use ($users) {
            // Crear y asociar los archivos al post
            $post->files()->saveMany([
                File::factory()->type('cover_image')->make(),
                File::factory()->type('file')->make(),
            ]);

            $users->each(function ($user) use ($post) {
                $like = new Like(['user_id' => $user->id]);
                $post->likes()->save($like);
            });
        });

        //Create a new user
        $this->user = User::factory()
            ->createFromApi(1)
            ->state(function (array $attributes) {
                return ['state' => '1'];
            })
            ->has(Post::factory()->count(2))
            ->create();
        $like = new Like(['user_id' => $this->user->id]);
        $posts->first()->likes()->save($like);
        $users = User::all();
        $this->posts = Post::withCount('likes')->get();
        $this->withoutExceptionHandling();
    }

    use RefreshDatabase;

    public function test_paginate()
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.index') . '?page=1');
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_show_post()
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.show', $this->posts->first()->getRouteKey()));
        $postResponse = $response->json()['data'];
        $response->assertJsonApiPostResource($this->posts->first(),  200);
    }

    public function test_post_of_specific_user()
    {
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.user.posts', $this->user->getRouteKey()));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this, $this->user);
    }

    public function test_list_all_post(): void
    {
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.index'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_filter_posts_for_category_career()
    {
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )
            ->getJson(route('api.post.index') . '?filter[career]=Contabilidad');
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    // public function test_filter_posts_for_category_semester()
    // {
    //     $this->withoutExceptionHandling();
    //     $response = $this->withHeader(
    //         'Authorization',
    //         'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
    //     )
    //         ->getJson(route('api.post.index') . '?filter[semester]=4');
    //     $postsResponse = $response->json()['data'];
    //     $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    // }

    public function test_filter_posts_for_title()
    {
        $this->posts->first()->title = 'title for my post';
        $this->posts->first()->save();
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.filter', 'title'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_filter_posts_for_month_day_year()
    {
        $this->withoutExceptionHandling();
        $this->posts->first()->created_at = '2022-01-19 03:58:08';
        $this->posts->first()->save();
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.filter', 'Enero 19 2022'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_filter_posts_for_month_year()
    {
        $this->posts->first()->created_at = '2022-01-02 03:58:08';
        $this->posts->first()->save();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.filter', 'Enero 2022'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_there_is_no_matched_in_the_filter()
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.post.filter', 'Esto no existe'))->dump();
        $response->assertStatus(204);
    }

    public function test_student_see_relevant_content_in_my_home_page()
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken', ['student'])->plainTextToken
        )->getJson(route('api.post.relevant'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_see_trending_post(){
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken', ['student'])->plainTextToken
        )->getJson(route('api.post.trending'))->dump();
        $response->assertStatus(200);
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }
}
