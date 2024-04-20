<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePostRequest;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PostController extends Controller
{

    function index()
    {
        $posts = Post::all();
        return PostCollection::make($posts);
    }

    function create(CreatePostRequest $request)
    {
        $title = $request->input('data.attributes.title');
        $description = $request->input('data.attributes.description');
        $post = Post::create([
            'title' => $title,
            'description' => $description,
            'user_id' => $request->user()->id
        ]);
        return PostResource::make($post);
    }


    function filterPosts($filter)
    {
        $filter = SettingsController::transl_to_en_carbon($filter);
        try {
            $date = Carbon::parse($filter);
            $month = $date->month;
            $year = $date->year;
            $day = $date->day;

            $posts = Post::whereYear('created_at', $year)
                ->whereMonth('created_at', $month)
                ->whereDay('created_at', $day)
                ->get();

        } catch (\Exception $e) {
            $posts = Post::where('title', 'LIKE', '%' . $filter . '%')->get();
        }
        return PostCollection::make($posts);
    }
}
