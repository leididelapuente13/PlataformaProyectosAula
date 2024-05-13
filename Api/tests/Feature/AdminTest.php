<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Str;

class AdminTest extends TestCase
{

    private $admin;
    private $user;
    protected function setUp(): void
    {
        parent::setUp();
        Role::factory(3)->create();
        $this->admin = User::create([
            'user_name' => 'Administrador',
            'email' => 'jimmisitho450@gmail.com',
            'code' => 0,
            'password' => bcrypt('admin'),
            'state' => '1',
            'role_id' => 1,
            'remember_token' => Str::random(10),
        ]);
        $this->user = User::factory(1)->create([
            'state' => '1',
        ]);
    }

    use RefreshDatabase;
    public function test_estado_usuario(): void
    {
        $this->withoutExceptionHandling();
        //dd($this->user->first()->state);
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        )
            ->getJson(route('api.user.admin.user.state', $this->user->first()->getRouteKey()));
        $user = User::skip(1)->first();
        $this->assertEquals($user->state, '0');
        $response->assertStatus(204);
    }
}
