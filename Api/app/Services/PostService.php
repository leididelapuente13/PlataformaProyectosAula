<?php

namespace App\Services;

use App\Repositories\PostRepository;

class PostService
{

    function __construct(protected PostRepository $postRepository , protected UserService $userService)
    {
    }

    function insert($title, $description, $user_id)
    {
        return $this->postRepository->insert($title, $description, $user_id);
    }

    function getAll($request)
    {
        $posts = collect();
        if ($request->has('filter')) {
            foreach ($request->get('filter') as $key => $value) {
                if ($key == 'career') {
                    $posts = $posts->merge($this->getPostsByCareer($value));
                } else if ($key == 'semester') {
                    // Agrega lógica para filtrar por semestre si es necesario
                } else {
                    $posts = $posts->merge($this->postRepository->getByQuery($key, $value)->get());
                }
            }
        } else {
            $posts = $this->postRepository->getAll();
        }
        return $posts->unique();
    }

    function getRelevant($user){
        $usersApi = $this->userService->getByApiCode($user->code); // Get the current user
        return $this->getPostsByCareer($usersApi['carrera']);
    }

    function getByDate($year, $month, $day)
    {
        return $this->postRepository->getByDate($year, $month, $day);
    }

    function getByFilter($filter)
    {
        return $this->postRepository->getByFilter($filter);
    }

    function getPostsByCareer($value){
        $users = $this->userService->getUsersApiByCareer($value); //Get all users by career
        $ids = $users->pluck('id')->toArray(); // Get users's ids
        return $this->postRepository->getByUsersIds($ids);
    }
}
