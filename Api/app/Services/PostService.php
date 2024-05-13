<?php

namespace App\Services;

use App\Http\Requests\CreatePostRequest;
use App\Repositories\PostRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;


class PostService
{

    function __construct(protected PostRepository $postRepository, protected UserService $userService)
    {
    }

    function insert(CreatePostRequest $request)
    {
        $title = $request->input('data.attributes.title');
        $description = $request->input('data.attributes.description');
        $user_id = $request->user()->id;

        if ($request->hasFile('data.attributes.cover_image')) {
            $coverImage = $request->file('data.attributes.cover_image');
            $coverImageName = $coverImage->getClientOriginalName();
            // $coverImagePath = $coverImage->storeAs('public/cover_image', $coverImageName);
            $coverImagePath = $this->storeFile($coverImage, 'public/cover_image');
        }

        if ($request->hasFile('data.attributes.file')) {
            $file = $request->file('data.attributes.file');
            $fileName = $file->getClientOriginalName();
            //$filePath = $file->storeAs('public/file', $fileName);
            $filePath = $this->storeFile($file, 'public/file');
        }

        $post =  $this->postRepository->insert($title, $description, $user_id);

        if (isset($coverImagePath)) {
            $post->files()->create([
                'name' => $coverImageName,
                'path' => $coverImagePath,
                'type' => 'cover_image'
            ]);
        }

        if (isset($filePath)) {
            $post->files()->create([
                'name' => $fileName,
                'path' => $filePath,
                'type' => 'file'
            ]);
        }

        return $post;
    }

    private function storeFile(UploadedFile $file, $path)
    {
        if (app()->environment('testing')) {
            return 'fake_path';
        } else {
            return $file->store($path);
        }
    }

    function getAll($request)
    {
        $posts = collect();
        if ($request->has('filter')) {
            foreach ($request->get('filter') as $key => $value) {
                if ($key == 'career') {
                    $posts = $posts->merge($this->getPostsByCareer($value));
                } else if ($key == 'semester') {
                } else {
                    $posts = $posts->merge($this->postRepository->getByQuery($key, $value)->get());
                }
            }
        } else {
            $posts = $this->postRepository->getAll();
        }

        if (!$posts) {
            return null;
        }

        $perPage = ($request->has('perPage')) ? $request->get('perPage') : 10;//Check perPage value
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentPageItems = $posts->forPage($currentPage, $perPage); //only elements from the current page
        $paginatedPosts = new LengthAwarePaginator($currentPageItems, $posts->count(), $perPage, $currentPage); //Create instance of pagination
        return $paginatedPosts;
    }

    function getById($id)
    {
        return $this->postRepository->getById($id);
    }

    function getByUserId($userId)
    {
        return $this->postRepository->getByUserId($userId);
    }

    function getRelevant($user)
    {
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

    function getPostsByCareer($value)
    {
        $users = $this->userService->getUsersApiByCareer($value); //Get all users by career
        $ids = $users->pluck('id')->toArray(); // Get users's ids
        return $this->postRepository->getByUsersIds($ids);
    }

    function getFilesPost($id)
    {
        $post = $this->postRepository->getById($id);
        return $post->files;
    }

    function delete($post)
    {
        $files = $this->getFilesPost($post);
        if ($this->postRepository->delete($post)) {
            foreach ($files as $file) {
                $this->deleteFile($file->path);
            }
            return true;
        };
        return false;
    }

    function deleteFile($path)
    {
        if (Storage::delete($path)) {
            return true;
        }
        return false;
    }
}
