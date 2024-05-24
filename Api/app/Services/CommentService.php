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

    public function create(Request $request, $post){
        $content = $request->input('data.attributes.content');
        $user_id = $request->user()->id;
        $comment = $this->commentRepository->insert($content, $post, $user_id);

        if(!$comment){
            return null;
        }
        return $comment;
    }
}
