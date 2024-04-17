<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{

    function create(CreatePostRequest $request){

        $title = $request->input('data.attributes.title');
        $description = $request->input('data.attributes.description');

        return response()->json([] , 200);
    }
}
