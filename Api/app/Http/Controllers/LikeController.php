<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\LikeService;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function __construct(protected LikeService $likeService)
    {
    }
    public function like(Request $request, $post_id){
        $like = $this->likeService->insert($request, $post_id);
        if($like = false){
            return response()->json([], 500);
        }
        return response()->json([] , 204);
    }

    public function unlike(Request $request, $post_id){
        $like = $this->likeService->delete($request, $post_id);
        if($like = false){
            return response()->json([], 500);
        }
        return response()->json([] , 204);
    }
}
