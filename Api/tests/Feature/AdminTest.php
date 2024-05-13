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
    }

    use RefreshDatabase;
    public function test_estado_usuario(): void
    {
        $response = $this->withHeader(
            'Authorization',
            'Bearer ' . $this->admin->createToken('TestToken', ['admin'])->plainTextToken
        )
            ->getJson(route('api.user.admin.user.state'));
        $response->assertStatus(200);
    }
}
