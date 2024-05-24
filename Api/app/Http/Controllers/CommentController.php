<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentCollection;
use App\Services\CommentService;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function __construct(protected CommentService $commentService)
    {

    }
    public function index(Request $request, $post)
    {
        $comments = $this->commentService->getAll($request, $post);

        if($comments == null){
            return response()->json([], 204);
        }

        return CommentCollection::make($comments);
    }
}
