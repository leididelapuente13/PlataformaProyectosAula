<?php

namespace Database\Seeders;

use App\Models\File;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FileSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = Post::all();
        $posts->each(function ($post) {
            //Create and associate the files with the post
            $post->files()->saveMany([
                File::factory()->type('cover_image')->make(),
                File::factory()->type('pdf')->make(),
            ]);
        });
    }
}
