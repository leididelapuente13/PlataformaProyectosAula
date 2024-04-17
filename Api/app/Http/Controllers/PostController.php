<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{

    function index(){
        return response()->json([],200);
    }
    
    function create(CreatePostRequest $request){
        $title = $request->input('data.attributes.title');
        $description = $request->input('data.attributes.description');
        $post = Post::create([
            'title' => $title,
            'description' => $description,
            'user_id' => $request->user()->id
        ]);
        return PostResource::make($post);
    }
}
