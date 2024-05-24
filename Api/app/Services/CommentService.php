<?php

namespace App\Services;

use App\Repositories\CommentRepository;
use Illuminate\Http\Request;

class CommentService{
    public function __construct(protected CommentRepository $commentRepository){
    }

    public function getAll(Request $request, $post){
        $perPage = $request->input('perPage', 10);
        $comments = $this->commentRepository->select($perPage , $post);
        if(!$comments){
            return null;
        }
        return $comments;
    }
}
