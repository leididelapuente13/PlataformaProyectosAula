<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Str;

class ListUserTest extends TestCase
{

    private $admin;
    private $users;
    protected function setUp(): void
    {
        parent::setUp();
        //Create roles
        Role::factory(3)->create();
        //Create a new admin
        $this->admin = User::create([
            'user_name' => 'Administrador',
            'email' => 'jimmisitho450@gmail.com',
            'code' => 0,
            'password' => bcrypt('admin'),
            'state' => '1',
            'role_id' => 1,
            'remember_token' => Str::random(10),
        ]);
        $this->users = User::factory(5)->create();
        // //create exact users for testing with external API
        $this->users[] = User::factory()->createFromApi(120)->create();
        $this->users[] = User::factory()->createFromApi(1)->create();
    }
    use RefreshDatabase;

    public function test_show_user()
    {
        $user = User::factory()->create();
        // Send a request with header 'Authorization'
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken')->plainTextToken
            ]
        )->getJson(route('api.user.show', $user->getRouteKey()));
        $userResponse = $response->json()['data'];
        $response->assertJsonApiUserResource($user, $userResponse, $this, 200);
    }

    public function test_can_list_users()
    {
        // Send a request with header 'Authorization'
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken')->plainTextToken
            ]
        )->getJson(route('api.user.index'));
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_paginate()
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->admin->createToken('TestToken')->plainTextToken
        )->getJson(route('api.user.index') . '?page=1&perPage=2');
        $usersResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $usersResponse, $this);
    }

    public function test_can_list_category_users_for_state()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.index') . '?filter[state]=0');
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_admin_can_list_category_users_for_role()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.index') . '?filter[role_id]=2');
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_can_filter_user_by_category_rol_and_state()
    {
        $this->withoutExceptionHandling();
        // Send a request with header 'Authorization'
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken')->plainTextToken
            ]
        )->getJson(route('api.user.index') . '?filter[role_id]=2&filter[state]=1');
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_can_filter_user_by_category_semester()
    {
        $this->withoutExceptionHandling();
        // Send a request with header 'Authorization'
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken')->plainTextToken
            ]
        )->getJson(route('api.user.index') . '?filter[semester]=4');
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_can_filter_user_by_category_career()
    {
        $this->withoutExceptionHandling();
        // Send a request with header 'Authorization'
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken')->plainTextToken
            ]
        )->getJson(route('api.user.index') . '?filter[career]=Contabilidad');
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }



    public function test_admin_can_filter_students_for_semester()
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter' , 'Semestre 4'));
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_admin_can_list_students_for_career()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter' , 'Contabilidad'));
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_admin_can_list_teachers_for_department()
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'Departamento de Artes'));
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_admin_can_filter_users_for_user_name()
    {
        $this->users->first()->user_name = 'Juan_Pedro';
        $this->users->first()->save();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'Juan_P'));
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($this->users, $userResponse, $this);
    }

    public function test_there_is_no_matched_in_the_filter()
    {
        $this->withoutExceptionHandling();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'Esto no existe'));
        $response->assertStatus(204);
    }
}
