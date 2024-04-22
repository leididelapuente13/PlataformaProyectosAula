<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    function index(Request $request)
    {
        $query = User::query();
        if($request->has('filter')){
            foreach($request->filter as $key => $value){
                $query->where($key, $value); // Add the query with the filter
            }
        }
        $query->where('role_id' , '!=' , 1); //exclude the first user admin
        $merge = [];
        $users = $query->get(); // Get the users
        foreach ($users as $user) {
            //Join and prepare the full user information
            $userApi = Controller::apiUserCodigo($user->code)->json();
            unset($userApi['id']);
            $fullUser = array_merge($userApi, $user->toArray());
            $merge[] = $fullUser;
        }

        return UserCollection::make($merge);
    }



    function create(CreateUserRequest $request)
    {
        //Request  extern api
        $codeUserApi = $request->input('data.attributes.code');
        $response = Controller::apiUserCodigo($codeUserApi);


        // Check if user is already created
        if (User::where('code', $codeUserApi)->first()) {
            $exception = ValidationException::withMessages([
                "data.attributes.code" => "The user has already been created"
            ]);
            $exception->status = 409;
            throw $exception;
        }

        // Code was found in extern api
        if ($response->successful()) {
            $userApi = $response->json();
            $user = new User();
            $user->user_name = $userApi['nombre'] . '_' . $userApi['apellidos'];
            $user->code = $userApi['codigo'];
            $user->email = $userApi['email'];
            $user->password = Hash::make($request->input('data.attributes.password'));

            // Check rol
            $userTipo = $userApi['tipo'];
            ($userTipo == 'Estudiante') ? $user->role_id = 2 : ($userTipo == 'Profesor' ? $user->role_id = 3 : $user->role_id = 1);
            $user->state = '1';
            //Create in data base using request's data
            $user->save();
            //Return a resource with user created
            return UserResource::make($user);
        }

        //Response extern api - code not found
        if ($response->status() == 404) {
            $exception = ValidationException::withMessages([
                "data.attributes.code" => "The user code provided is not valid"
            ]);
            $exception->status = 403;
            throw $exception;
        }
    }

    function show(User $user)
    {
        return UserResource::make($user);
    }

    public function filterUser($filter)
    {
        $merge = [];
        $usersApi = Controller::apiUsersFilter($filter)->json();
        if ((isset($usersApi['message'])) && $usersApi['message'] === "No encontrado") {
            //No match found in external api search in local database
            $users = User::where('user_name', 'LIKE', '%' . $filter . '%')
                ->orWhere('state', 'LIKE', ($filter == "Activo" || $filter == "activo") ? 1 : (($filter == "Inactivo" || $filter == "inactivo") ? 0 : 3))
                ->orWhere('role_id', 'LIKE', ($filter == "Estudiante") ? 2 : ($filter == "Profesor" ? 3 : 0))
                ->get();
            //Join the information of the users
            foreach ($users as $user) {
                $userApi = Controller::apiUserCodigo($user->code)->json();
                unset($userApi['id']);
                //Skip the admin
                if ($user->role_id == 1) {
                    continue;
                }
                $fullUser = array_merge($userApi, $user->toArray());
                $merge[] = $fullUser;
            }
        } else {
            //Matches was found in external api
            foreach ($usersApi as $userApi) {
                $user = User::where('code', $userApi['codigo'])->first();
                if ($user) {
                    unset($userApi['id']);
                    $fullUser = array_merge($userApi, $user->toArray());
                    $merge[] = $fullUser;
                }
            }
        }
        if(empty($merge)){
            return response()->json([] , 204);
        }
        return UserCollection::make($merge);
    }
}
