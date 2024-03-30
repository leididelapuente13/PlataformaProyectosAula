<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListUserTest extends TestCase
{

    private $user;
    protected function setUp(): void
    {
        parent::setUp();
        //Create roles
        Role::factory(3)->create();
        //Create a new user
        $this->user = User::factory(1)->create([
            'state' => '1'
        ])->first();
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

    public function test_admin_can_filter_users()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->user->createToken('TestToken' , ['admin'])->plainTextToken
        ])->getJson(route('api.user.filter', 'parametro'));
        $response->assertOk();
    }
}
