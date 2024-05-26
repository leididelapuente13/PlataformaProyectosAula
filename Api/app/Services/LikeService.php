<?php
namespace App\Services;

use App\Repositories\LikeRepository;
use Illuminate\Http\Request;

class LikeService{

    public function __construct(protected LikeRepository $likeRepository){
    }

    public function insert(Request $request, $post_id){
        $user_id = $request->user()->id;
        $like = $this->likeRepository->insert($post_id, $user_id);
        return ($like) ? true : false;
    }

    public function delete(Request $request, $post_id){
        $user_id = $request->user()->id;
        $like = $this->likeRepository->delete($post_id, $user_id);
        return ($like) ? true : false;
    }
}
