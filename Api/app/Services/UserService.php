<?php

namespace App\Services;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserService
{

    public function __construct(protected UserRepository $userRepository)
    {
    }

    /*
        state's value must be ( 1 , 0)
    */
    public function getAll(Request $request)
    {
        $users = collect();
        if ($request->has('filter')) {
            foreach ($request->filter as $key => $value) {
                //Check the filters
                if ($key == 'semester') {
                    $users = $users->merge($this->getUsersApiBySemester($value));
                } else if ($key == 'career') {
                    $users = $users->merge($this->getUsersApiByCareer($value));
                } else {
                    $users = $users->merge($this->userRepository->getByQuery($key, $value));
                }
            }
        } else {
            $users = $users->merge($this->userRepository->getAll()); //There's not filter in the request
        }
        $users = $users->unique();
        $perPage = ($request->has('perPage') ? $request->get('perPage') : 20);
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentPageItems = $users->forPage($currentPage, $perPage);
        $paginatedUsers = new LengthAwarePaginator($currentPageItems, $users->count(), $perPage, $currentPage);
        return $paginatedUsers;
    }

    public function insert(CreateUserRequest $request)
    {
        $code = $request->input('data.attributes.code');
        $userApi = $this->getByApiCode($code);
        // Code wasn't found in extern api
        if ($userApi == null) {
            return null;
        }

        $password = Hash::make($request->input('data.attributes.password'));
        $userTipo = $userApi['tipo'];
        $role_id = ($userTipo == 'Estudiante') ? 2 : ($userTipo == 'Profesor' ?  3 : 1);
        return $this->userRepository->insert($userApi, $password, $role_id);
    }

    public function getById($id)
    {
        $user = $this->userRepository->getById($id);
        $userApi = Controller::apiUserCodigo($user->code)->json();
        $fullUser = array_merge($userApi, $user->toArray()); // Join the users' informations
        return $fullUser;
    }

    public function getByCode($code)
    {
        return $this->userRepository->getByCode($code);
    }
    public function getByCodes($code)
    {
        return $this->userRepository->getByCodes($code);
    }

    public function getByApiCode($codigo)
    {
        $response = Controller::apiUserCodigo($codigo);
        if ($response->status() == 200) {
            $user = $response->json();
            unset($user['id']);
            return $user;
        }

        if ($response->status() == 404) {
            return null;
        }
    }

    public function userState($id)
    {
        $user = $this->userRepository->getById($id);
        if (!$user) {
            return null;
        }
        $oldState = $user->state;
        //Change user state
        $user->state = ($user->state == 1) ? 0 : 1;
        $user->save();
        //Verify if it was changed
        return  $user->state != $oldState;
    }

    public function filter($filter)
    {
        $merge = [];
        $usersApi = Controller::apiUsersFilter($filter)->json();
        // Determine if matches were found in the external API
        $matchesFound = isset($usersApi['message']) && $usersApi['message'] === "No encontrado" ? false : true;
        // Get users from the local bd on the filter
        $users = $this->userRepository->getByFilter($filter);
        // Process users based on whether matches were found in the external API
        foreach ($matchesFound ? $usersApi : $users as $index => $userData) {
            // Get user data based on where the data was obtained from
            $user = $matchesFound ? $this->userRepository->getByCode($userData['codigo']) : $users[$index];
            // Check if the user exists and merge user data with API data
            if ($user) {
                $merge[] = array_merge($matchesFound ? $userData : $this->getByApiCode($user->code), $user->toArray());
            }
        }
        return $merge;
    }

    public function getUsersApiByCareer($career)
    {
        $usersApi = Controller::apiUsersbyCarrera($career)->json();
        return $this->mixUserExternalApi($usersApi);
    }

    public function mixUserExternalApi($usersApi)
    {
        $codes = collect($usersApi)->pluck('codigo')->toArray();
        $users = $this->userRepository->getByCodes($codes);
        $merge = [];
        // Create a lookup table of users by their code for efficient retrieval
        $usersByCode = collect($users)->keyBy('code');
        foreach ($usersApi as $userApi) {
            // Retrieve the corresponding user from the repository based on the API code
            $user = $usersByCode->get($userApi['codigo']);
            // If a matching user is found
            if ($user) {
                $merge[] = array_merge($userApi, $user->toArray());
            }
        }
        return $merge;
    }

    public function getUsersApiBySemester($semester)
    {
        $usersApi = Controller::apiUsersbySemestre($semester)->json();
        return $this->mixUserExternalApi($usersApi);
    }
}
