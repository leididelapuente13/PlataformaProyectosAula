<?php

namespace App\Services;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
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
        $merge = [];
        foreach ($users as $user) {
            //Join and prepare the full user information
            $userApi = $this->getByApiCode($user->code);
            $merge[] = array_merge($userApi, $user->toArray());;
        }
        return $merge;
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
        unset($userApi['id']);
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


    public function filter($filter)
    {
        $merge = [];
        $usersApi = Controller::apiUsersFilter($filter)->json();
        if ((isset($usersApi['message'])) && $usersApi['message'] === "No encontrado") { //Not maches in external api
            $users = $this->userRepository->getByFilter($filter);
            foreach ($users as $user) {
                $userApi = $this->getByApiCode($user->code);
                $merge[] = array_merge($userApi, $user->toArray());
            }
        } else {
            //Matches was found in external api
            foreach ($usersApi as $userApi) {
                $user = $this->userRepository->getByCode($userApi['codigo']);
                if ($user) {
                    unset($userApi['id']);
                    $merge[] = array_merge($userApi, $user->toArray());;
                }
            }
        }
        return $merge;
    }

    public function getUsersApiByCareer($career)
    {
        $usersApi = Controller::apiUsersbyCarrera($career)->json();
        $codes = collect($usersApi)->pluck('codigo')->toArray(); //Get all codes
        return $this->userRepository->getByCodes($codes);
    }

    public function getUsersApiBySemester($semester)
    {
        $usersApi = Controller::apiUsersbySemestre($semester)->json();
        $codes = collect($usersApi)->pluck('codigo')->toArray();
        return $this->userRepository->getByCodes($codes);
    }
}
