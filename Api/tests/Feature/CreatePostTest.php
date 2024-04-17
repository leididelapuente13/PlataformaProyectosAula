<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreatePostTest extends TestCase
{
    private $user;
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
    }

    use RefreshDatabase;
    public function test_student_can_create_post(): void
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['student'])->plainTextToken
            ]
        )->postJson(
            route('api.post.create'),
            [
                'data' => [
                    'type' => 'post',
                    'attributes' => [
                        'title' => 'Test Title',
                        'description' => 'Test Content',
                    ]
                ]
            ]
        );
        $post = Post::first();
        $response->assertJsonApiPostResource($post , 201);
    }

    public function test_title_validations(){
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['student'])->plainTextToken
            ]
        )->postJson(
            route('api.post.create'),
            [
                'data' => [
                    'type' => 'post',
                    'attributes' => [
                        'description' => 'Test Content',
                    ]
                ]
            ]
        );
        $response->assertJsonApiValidationErrors('title');
    }

    public function test_description_validation(){
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['student'])->plainTextToken
            ]
        )->postJson(
            route('api.post.create'),
            [
                'data' => [
                    'type' => 'post',
                    'attributes' => [
                        'title' => 'Test Title',
                    ]
                ]
            ]
        );
        $response->assertJsonApiValidationErrors('description');
    }

}
