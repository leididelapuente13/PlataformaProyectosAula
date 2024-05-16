<?php

namespace Tests\Unit;

use App\Repositories\UserRepository;
use App\Services\UserService;
use Mockery;
use Tests\TestCase;

class ApiTest extends TestCase
{
    public function tearDown(): void
    {
        parent::tearDown();
        Mockery::close();
    }

    /**
     @test
     */
    public function user_api_by_career()
    {
        // Mock del facade Storage para simular la eliminación de un archivo


        $usersApi = [
            [
                'codigo' => 1234,
                'name' => 'Juan',
                'lastname' => 'Perez',
                'email' => 'jperez@gmail.com',
                'semestre' => 2,
                'carrera' => 'Contabilidad'
            ],
            [
                'codigo' => 7899,
                'name' => 'Pedro',
                'lastname' => 'Gomez',
                'email' => 'jpedro@gmail.com',
                'semestre' => 5,
                'carrera' => 'Sistemas'
            ]
        ];

        $users = collect([
            new \App\Models\User([
                'id' => 1,
                'code' => 1234,
                'email' => 'jperez@gmail.com',
                'user_name' => 'Juan_Perez'
            ]),
            new \App\Models\User([
                'id' => 2,
                'code' => 7899,
                'email' => 'jpedro@gmail.com',
                'user_name' => 'Pedro_Gomez'
            ])
        ]);

        $userRepository = Mockery::mock(UserRepository::class);
        $userRepository->shouldReceive('getByCodes')->once()->with(
            [1234, 7899]
        )->andReturn($users);

        $userService = new UserService($userRepository);

        $result = $userService->mixUserExternalApi($usersApi);
        $this->assertEquals([
            [
                'codigo' => 1234,
                'name' => 'Juan',
                'lastname' => 'Perez',
                'email' => 'jperez@gmail.com',
                'code' => 1234,
                'user_name' => 'Juan_Perez',
                'semestre' => 2,
                'carrera' => 'Contabilidad'
            ],
            [
                'codigo' => 7899,
                'name' => 'Pedro',
                'lastname' => 'Gomez',
                'email' => 'jpedro@gmail.com',
                'code' => 7899,
                'user_name' => 'Pedro_Gomez',
                'semestre' => 5,
                'carrera' => 'Sistemas'

            ]
        ], $result);
    }
}
