<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
        //Create a new user
        $this->user = User::factory(1)->create([
            'state' => '1',
            'role_id' => 2
        ])->first();

        $this->posts = Post::factory(10)->create();
    }

    use RefreshDatabase;
    public function test_list_all_post(): void
    {
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.index'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_filter_posts_for_title(){

        $this->posts->first()->title = 'title for my post';
        $this->posts->first()->save();
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.filter' , 'title'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_filter_posts_for_month_day_year(){
        $this->withoutExceptionHandling();
        $this->posts->first()->created_at = '2022-01-19 03:58:08';
        $this->posts->skip(2)->first()->created_at = '2022-01-01 03:58:08';
        $this->posts->skip(2)->first()->save();
        $this->posts->first()->save();
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.filter' , 'Enero 19 2022'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

    public function test_filter_posts_for_month_year(){
        $this->withoutExceptionHandling();
        $this->posts->first()->created_at = '2022-01-02 03:58:08';
        $this->posts->skip(2)->first()->created_at = '2022-01-01 03:58:08';
        $this->posts->skip(2)->first()->save();
        $this->posts->first()->save();
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
        )->getJson(route('api.post.filter' , 'Enero 2022'));
        $postsResponse = $response->json()['data'];
        $response->assertJsonApiPostsResource($this->posts, $postsResponse, $this);
    }

}
