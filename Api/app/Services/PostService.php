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
                    $users = $this->userService->getUsersApiByCareer($value);
                    $user_ids = collect($users)->pluck('id')->toArray();
                    $posts = $posts->merge($this->postRepository->getByUsersIds($user_ids)->get());
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

    function getByDate($year, $month, $day)
    {
        return $this->postRepository->getByDate($year, $month, $day);
    }

    function getByFilter($filter)
    {
        return $this->postRepository->getByFilter($filter);
    }
}
