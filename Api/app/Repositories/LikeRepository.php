<?php

namespace App\Repositories;

use App\Models\Like;

class LikeRepository{
    public function __construct(protected Like $like){
    }

    public function insert($post_id, $user_id){
        return $this->like::create([
            'post_id' => $post_id,
            'user_id' => $user_id
        ]);
    }

    public function delete($post_id, $user_id){
        return $this->like::where('post_id', $post_id)->where('user_id', $user_id)->delete();
    }
}
