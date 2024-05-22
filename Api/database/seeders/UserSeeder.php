<?php

namespace Database\Seeders;

use App\Http\Controllers\Controller;
use App\Models\File;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Create admin user
        User::create([
            'user_name' => 'Administrador',
            'email' => 'jimmisitho450@gmail.com',
            'code' => 0,
            'password' => bcrypt('admin'),
            'role_id' => 1,
            'remember_token' => Str::random(10),
        ]);


        User::factory()
            ->count(30)
            ->create();

        // $users = User::all();
        // $users->each(function ($user) {
        //     //create and associate the users with the post
        //     if ($user->role_id == 2 && $user->state == '1') {
        //         $user->posts()->saveMany([
        //             Post::factory()->make(),
        //             Post::factory()->make()
        //         ]);
        //     }
        // });


        // $posts = Post::all();

        // $posts->each(function ($post) use ($users) {
        //     //Create and associate the files with the post
        //     $post->files()->saveMany([
        //         File::factory()->type('cover_image')->make(),
        //         File::factory()->type('file')->make(),
        //     ]);

        //     //Iterate over users
        //     $users->each(function ($user) use ($post) {
        //         if ($user->role_id != 1) {
        //             $like = new Like(['user_id' => $user->id]);
        //             $post->likes()->save($like);
        //         }
        //     });
        // });
    }
}
