<?php

namespace Database\Factories;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        //Id random
        $id =  $this->faker->unique()->numberBetween(50, 120);
        //Get user with the id from external API
        $user = Controller::apiUserId($id);

        //Return the user generated
        return [
            'state' => $this->faker->randomElement(['0', '1']),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'user_name' => $user['nombre'] . "_" . $user['apellidos'],
            'code' => $user['codigo'],
            'email' => $user['email'],
            'role_id' => ($user['tipo'] == 'Estudiante')  ? 2 : 3,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

}
