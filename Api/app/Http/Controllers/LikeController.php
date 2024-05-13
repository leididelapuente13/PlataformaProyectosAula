<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function like($post_id){
        return response()->json([] , 200);
    }
}
