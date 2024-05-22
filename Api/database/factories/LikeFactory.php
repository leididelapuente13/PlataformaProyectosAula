<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Like>
 */
class LikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::factory()->create([ 'state' => '1']);
        return [
            'user_id' => $user->id,
            'post_id' => Post::factory()->create(['user_id' => $user->id])->id
        ];
    }
}
