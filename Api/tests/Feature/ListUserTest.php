<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Closure;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;
use Illuminate\Support\Str;

class ListUserTest extends TestCase
{

    private $user;
    protected function setUp(): void
    {
        parent::setUp();
        //Create roles
        Role::factory(3)->create();
        //Create a new user
        $this->user = User::create([
            'user_name' => 'Administrador',
            'email' => 'jimmisitho450@gmail.com',
            'code' => 0,
            'password' => bcrypt('admin'),
            'state' => '1',
            'role_id' => 1,
            'remember_token' => Str::random(10),
        ]);
    }
    use RefreshDatabase;

    public function test_show_user()
    {
        // Send a request with header 'Authorization'
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
            ]
        )->getJson(route('api.user.show', $this->user->getRouteKey()));
        $response->assertJsonApiUserResource($this->user, 200);
    }

    public function test_can_list_users(){
        $this->withoutExceptionHandling();
        $users = User::factory(10)->create();
        // Send a request with header 'Authorization'
        $response = $this->withHeaders(
            [
                'Authorization' => 'Bearer ' . $this->user->createToken('TestToken')->plainTextToken
            ]
        )->getJson(route('api.user.index'));
        $usersResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($users, $usersResponse, $this);
    }

    public function test_admin_can_filter_users_for_user_name()
    {
        $this->withoutExceptionHandling();
        $users = User::factory(4)->create();
        $users->first()->user_name = 'Juan_Pedro';
        $users->first()->save();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'Pedro'));
        $usersResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($users, $usersResponse, $this);
    }

    public function test_can_list_users_for_state(){
        $this->withoutExceptionHandling();
        $users = User::factory(20)->create();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'inactivo'));
        $usersResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($users, $usersResponse, $this);
    }

    public function test_admin_can_list_users_for_role(){
        $this->withoutExceptionHandling();
        $users = User::factory(20)->create();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'Profesor'));
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($users, $userResponse, $this);
    }

    public function test_admin_can_list_students_for_semester(){
        $this->withoutExceptionHandling();
        $users = User::factory(20)->create();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'Semestre 4'));
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($users, $userResponse, $this);
    }

    public function test_admin_can_list_students_for_career(){
        $this->withoutExceptionHandling();
        $users = User::factory(20)->create();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'Ingenieria'));
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($users, $userResponse, $this);
    }

    public function test_admin_can_list_teachers_for_department(){
        $this->withoutExceptionHandling();
        $users = User::factory(20)->create();
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->user->createToken('TestToken', ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'Idiomas'))->dump();
        $userResponse = $response->json()['data'];
        $response->assertJsonUsersFilterResource($users, $userResponse, $this);
    }


}
