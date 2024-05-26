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
 * @test
 */
// public function mix_user()
// {
//     $usersApi = [
//         [
//             'codigo' => 1234,
//             'name' => 'Juan',
//             'lastname' => 'Perez',
//             'email' => 'jperez@gmail.com',
//             'semestre' => 2,
//             'carrera' => 'Contabilidad'
//         ],
//         [
//             'codigo' => 7899,
//             'name' => 'Pedro',
//             'lastname' => 'Gomez',
//             'email' => 'jpedro@gmail.com',
//             'semestre' => 5,
//             'carrera' => 'Sistemas'
//         ]
//     ];

//     $users = collect([
//         new \App\Models\User([
//             'id' => 1,
//             'code' => 1234,
//             'email' => 'jperez@gmail.com',
//             'user_name' => 'Juan_Perez'
//         ]),
//         new \App\Models\User([
//             'id' => 2,
//             'code' => 7899,
//             'email' => 'jpedro@gmail.com',
//             'user_name' => 'Pedro_Gomez'
//         ])
//     ]);

//     $userRepository = Mockery::mock(UserRepository::class);
//     $userService = new UserService($userRepository);

//     // Configurar expectativas para el método getByApiCode
//     foreach ($users as $index => $user) {
//         $userRepository->shouldReceive('getByApiCode')->with($user->code)
//             ->andReturn($usersApi[$index]);
//     }

//     // Llamar al método mixUserLocalWithExternal y verificar el resultado
//     $result = $userService->mixUserLocalWithExternal($users);

//     // Verificar que el resultado coincide con los datos esperados
//     $expectedResult = collect([
//         [
//             'codigo' => 1234,
//             'name' => 'Juan',
//             'lastname' => 'Perez',
//             'email' => 'jperez@gmail.com',
//             'code' => 1234,
//             'user_name' => 'Juan_Perez',
//             'semestre' => 2,
//             'carrera' => 'Contabilidad'
//         ],
//         [
//             'codigo' => 7899,
//             'name' => 'Pedro',
//             'lastname' => 'Gomez',
//             'email' => 'jpedro@gmail.com',
//             'code' => 7899,
//             'user_name' => 'Pedro_Gomez',
//             'semestre' => 5,
//             'carrera' => 'Sistemas'
//         ]
//     ]);

//     $this->assertEquals($expectedResult, $result);
// }

}
