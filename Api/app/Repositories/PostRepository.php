<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository
{
    function __construct(protected Post $post)
    {
    }

    function insert($title, $description, $user_id)
    {
        return $this->post::create([
            'title' => $title,
            'description' => $description,
            'user_id' => $user_id
        ]);
    }

    function getAll()
    {
        return $this->post::all();
    }

    function getByQuery($key, $value)
    {
        return $this->post::where($key, $value);
    }

    function getById($id)
    {
        return $this->post::where('id' , $id)->first();
    }

    function getByUserId($user_id){
        return $this->post::where('user_id' , $user_id)->get();
    }

    function getByUsersIds($users_ids)
    {
        return $this->post::whereIn('user_id', $users_ids)->get();
    }

    function getByUsersCodes($codes){
        return $this->post::select('posts.*')
        ->join('users', 'users.id', '=', 'posts.user_id')
        ->whereIn('users.code', $codes)
        ->get();
    }

    function getByDate($year, $month, $day)
    {
        //Bluid the consultation
        $query = $this->post::query();
        $query->whereYear('created_at', $year)
            ->whereMonth('created_at', $month);
        //The day was specified
        if ($day !== null) {
            $query->whereDay('created_at', $day);
        }
        return $query->get();
    }

    function getByFilter($filter){
        return $this->post::where('title', 'LIKE', '%' . $filter . '%')->get();
    }

}
