<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $users->each(function ($user) {
            //create and associate the users with the post
            if ($user->role_id == 2 && $user->state == '1') {
                $user->posts()->saveMany([
                    Post::factory()->make(),
                    Post::factory()->make()
                ]);
            }
        });
    }
}
