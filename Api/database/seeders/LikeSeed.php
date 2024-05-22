<?php

namespace Database\Seeders;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikeSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = Post::all();
        $users = User::all();
        $posts->each(function ($post) use ($users) {
            //Iterate over users
            $users->each(function ($user) use ($post) {
                if ($user->role_id != 1) {
                    $like = new Like(['user_id' => $user->id]);
                    $post->likes()->save($like);
                }
            });
        });
    }
}
