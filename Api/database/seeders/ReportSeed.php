<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = Post::all();
        $users = User::paginate(8);
        $posts->each(function ($post) use ($users) {
            //Iterate over users
            $users->each(function ($user) use ($post) {
                if ($user->role_id != 1) {
                    $report = Report::factory()->make([ 'user_id' => $user->id]);
                    $post->reports()->save($report);
                }
            });
        });
    }
}
