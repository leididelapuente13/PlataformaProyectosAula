<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class CreateUserTest extends TestCase
{

    use RefreshDatabase;
    /**
     @test
     */
    public function can_create_user_student()
    {

        //$this->withoutExceptionHandling();
        $response = $this->postJson(
            route('api.user.create'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'code' =>  123456789,
                        'password' => 'password',
                    ]
                ]
            ]
        );


        //The user was created successfully ( 201 )
        $response->assertCreated();
        $user = User::first();
        $token = $response->json('data.attributes.token');

        //Check the Json response
        $response->assertJson([
            'data' =>
            [
                'type' => 'user',
                'id' => (string) $user->getRouteKey(),
                'attributes' => [
                    'user_name' => 'Adrain_Rutherford',
                    'code' => 123456789,
                    'email' => 'mark.jaskolski@example.net',
                    'role_id' => 2,
                    'description' => null,
                    'state' => '1',
                    'token' => $token
                ],
                'links' => [
                    //'self' => route('api.user.show' , $user)
                    'self' => 'null'
                ]
            ]
        ]);
    }


    /**
        @test
     */
    public function code_is_required()
    {
        // Send a request without code
        $response = $this->postJson(
            route('api.user.create'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'password' => 'password',
                    ]
                ]
            ]
        )->dump();

        // Using the macro create in MakesJsonRequest to validate
        $response->assertJsonApiValidationErrors('code');
    }

    /**
     @test
     */
    public function password_is_required()
    {
        // Send a request without password
        $response = $this->postJson(
            route('api.user.create'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'code' =>  123456789,
                    ]
                ]
            ]
        )->dump();

        // Using the macro create in MakesJsonRequest to validate
        $response->assertJsonApiValidationErrors('password');
    }

    /**
     @test
     */
    public function password_min_8()
    {
        // Send a request with password not valid
        $response = $this->postJson(
            route('api.user.create'),
            [
                'data' => [
                    'type' => 'user',
                    'attributes' => [
                        'code' =>  123456789,
                        'password' => 'passw',
                    ]
                ]
            ]
        )->dump();

        // Using the macro create in MakesJsonRequest to validate
        $response->assertJsonApiValidationErrors('password');
    }

    /**
     @test
     */
    public function invalid_code_registration()
    {

        // Send a request with a invalid code
        $response = $this->postJson(route('api.user.create'), [
            'data' => [
                'type' => 'user',
                'attributes' => [
                    'code' => 121212,
                    'password' => 'password',
                ]
            ]
        ]);


        // Validate the Json response's structure
        $response->assertStatus(422)
            ->assertJsonStructure([
                'errors' => [
                    [
                        'title',
                        'detail',
                    ]
                ]
            ])
            ->assertJsonFragment([ //verificar el contenido
                'title' => 'Código de usuario inválido',
                'detail' => 'El código de usuario proporcionado no es válido.',
            ]);
    }
}
