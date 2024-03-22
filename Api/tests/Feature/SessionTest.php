<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SessionTest extends TestCase
{

    private $user;
    protected function setUp(): void
    {
        parent::setUp();
        //Create a new user
        Role::factory(3)->create();
        $this->user = User::factory(1)->create([
            'state' => '1'
        ])->first();
    }

    use RefreshDatabase;
    /**
     @test
     */
    public function can_to_do_login(): void
    {
        //Send a request
        $response = $this->post(
            route('api.user.login'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'email' => $this->user->email,
                        'password' => 'password'
                    ]
                ]
            ]
        );

        //Check de format of the response and statusCode
        $response->assertStatus(200);
        $token = $response->json('data.attributes.token');
        $response->assertJson([
            'data' =>
            [
                'type' => 'user',
                'id' => (string) $this->user->getRouteKey(),
                'attributes' => [
                    'user_name' => $this->user->user_name,
                    'code' => $this->user->code,
                    'email' => $this->user->email,
                    'role_id' => $this->user->role_id,
                    'description' => $this->user->description,
                    'state' => '1',
                    'token' => $token
                ],
                'links' => [
                    //'self' => route('api.user.show' , $this->user)
                    'self' => 'null'
                ]
            ]
        ]);
    }
    
    /**
     @test
     */
    public function incorrect_credentials()
    {
        $response = $this->post(
            route('api.user.login'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'email' => $this->user->email,
                        'password' => 'passwo'
                    ]
                ]
            ]
        );
        // Using the macro create in MakesJsonRequest to validate
        $response->assertJsonApiValidationErrors('credentials');
    }

    /**
     @test
     */
    public function account_is_suspended()
    {
        $user = User::factory(1)->create([
            'state' => '0'
        ])->first();
        $response = $this->post(
            route('api.user.login'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'email' => $user->email,
                        'password' => 'password'
                    ]
                ]
            ]
        );
        $response->assertJsonApiValidationErrors('credentials', 403);
    }

    /**
     @test
     */
    public function password_is_required()
    {
        // Send a request without password
        $response = $this->postJson(
            route('api.user.login'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'email' => $this->user->email,
                    ]
                ]
            ]
        );

        $response->assertJsonApiValidationErrors('password');
    }

    /**
     @test
     */
    public function email_is_required()
    {
        // Send a request without email
        $response = $this->postJson(
            route('api.user.login'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'password' => 'password',
                    ]
                ]
            ]
        );
        $response->assertJsonApiValidationErrors('email');
    }
}
