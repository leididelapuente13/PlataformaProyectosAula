<?php

namespace Tests\Feature;

use App\Models\File;
use App\Models\Post;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LikePostTest extends TestCase
{

    protected $user;
    protected $post;
    protected function setUp(): void
    {
        parent::setUp();
        Role::factory(3)->create();
        $this->user = User::factory()
            ->createFromApi(1)
            ->state(function (array $attributes) {
                return ['state' => '1'];
            })
            ->has(Post::factory()->count(1))
            ->create();

        $post = Post::first();
        $post->files()->saveMany([
            File::factory()->type('cover_image')->make(),
            File::factory()->type('file')->make(),
        ]);
        $this->post = Post::all();
        $this->withoutExceptionHandling();
    }
    use RefreshDatabase;
    public function test_user_can_like_post(): void
    {
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->user->createToken('TestToken', ['student'])->plainTextToken
        )->getJson(Route('api.like.post', $this->post->first()->getRouteKey()));
        $response->assertStatus(200);
    }
}
