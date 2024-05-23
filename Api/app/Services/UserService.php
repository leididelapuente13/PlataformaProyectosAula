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
        $query = $this->userRepository->query();

        if ($request->has('filter')) {
            foreach ($request->filter as $key => $value) {
                if ($key == 'semester') {
                    $query = $this->applySemesterFilter($query, $value);
                } else if ($key == 'career') {
                    $query = $this->applyCareerFilter($query, $value);
                } else {
                    $query = $this->userRepository->applyFilter($query, $key, $value);
                }
            }
        }
        $users = $query->get();
        $users = $this->mixUserLocalWithExternal($users);
        $perPage = ($request->has('perPage') ? $request->get('perPage') : 20);
        return $this->paginate($users, $perPage);
    }

    public function insert(CreateUserRequest $request)
    {
        $code = $request->input('data.attributes.code');
        $userApi = $this->getByApiCode($code);
        if ($userApi == null) {
            return null;
        }

        $password = Hash::make($request->input('data.attributes.password'));
        $userTipo = $userApi['tipo'];
        $role_id = ($userTipo == 'Estudiante') ? 2 : ($userTipo == 'Profesor' ?  3 : 1);
        return $this->userRepository->insert($userApi, $password, $role_id);
    }

    public function userState($id)
    {
        $user = $this->userRepository->getById($id);
        if (!$user) {
            return null;
        }
        $oldState = $user->state;

        //Change user state
        $user->state = ($user->state == "1") ? "0" : "1";
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

    public function getByCode($code)
    {
        return $this->userRepository->getByCode($code);
    }

    public function getById($id)
    {
        $user = $this->userRepository->getById($id);
        $userApi = Controller::apiUserCodigo($user->code)->json();
        $fullUser = array_merge($userApi, $user->toArray()); // Join the users' informations
        return $fullUser;
    }

    //private local functions
    public function mixUserLocalWithExternal($users)
    {
        $merge = [];
        foreach ($users as $user) {
            $userApi = $this->getByApiCode($user->code);
            if ($userApi) {
                $merge[] = array_merge($userApi, $user->toArray());
            }
        }
        return collect($merge);
    }

    private function paginate($users, $perPage)
    {
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentPageItems = $users->forPage($currentPage, $perPage);
        return new LengthAwarePaginator($currentPageItems, $users->count(), $perPage, $currentPage);
    }

    private function applySemesterFilter($query, $value)
    {
        $semesterUsers = $this->getUsersApiBySemester($value);
        $userCodigos = collect($semesterUsers)->pluck('codigo');
        return $query->whereIn('code', $userCodigos);
    }

    private function applyCareerFilter($query, $value)
    {
        $careerUsers = $this->getUsersApiByCareer($value);
        $userCodigos = collect($careerUsers)->pluck('codigo');
        return $query->whereIn('code', $userCodigos);
    }

    //External api functions
    public function getUsersApiByCareer($career)
    {
        return Controller::apiUsersbyCarrera($career)->json();
    }

    public function getUsersApiBySemester($semester)
    {
        return Controller::apiUsersbySemestre($semester)->json();
    }

    public function getByApiCode($codigo)
    {
        $response = Controller::apiUserCodigo($codigo);
        if ($response->status() == 200) {
            $user = $response->json();
            unset($user['id']);
            return $user;
        }
        return null;
    }
}
