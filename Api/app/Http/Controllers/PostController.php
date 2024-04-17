<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{

    function create(Request $request){
        return response()->json([] , 200);
    }
}
