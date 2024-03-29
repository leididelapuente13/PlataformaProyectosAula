<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
        $this->actingAs($this->user);
        $response = $this->getJson(route('api.user.show', $this->user->getRouteKey()));
        $response->assertJsonApiUserResource($this->user, 200);
    }
}
