<?php

namespace App\Repositories;

use App\Models\Comment;

class CommentRepository
{
    public function __construct(protected Comment $comment)
    {
    }

    public function select($perPage, $post)
    {
        return $this->comment::where('post_id' , $post)
            ->paginate($perPage);
    }

    public function insert($content , $post_id, $user_id )
    {
        return $this->comment::create([
            'post_id' => $post_id,
            'user_id' => $user_id,
            'content' => $content
        ]);
    }
}
