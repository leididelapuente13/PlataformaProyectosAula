<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function create(Request $request)
    {

        $request->validate([
            "data.attributes.code" => ["required"],
            "data.attributes.password" => "required|min:8",
        ]);

        //Request  extern api
        $code = $request->input('data.attributes.code');
        $response = Controller::apiUser($code);

        // Code was found in extern api
        if ($response->successful()) {
            $api = $response->json();
            $user = new User();
            $user->user_name = $api['nombre'] . '_' . $api['apellidos'];
            $user->code = $api['codigo'];
            $user->email = $api['email'];
            $user->password = Hash::make($request->input('password'));

            // Check rol
            if ($api['tipo'] == 'Estudiante') {
                $user->role_id = 2;
            } elseif ($api['tipo'] == 'Profesor') {
                $user->role_id = 3;
            }

            //Create in data base using request's data
            $user->save();
            //Return a resource with user created
            return UserResource::make($user);
        }

        //Response extern api - code not found
        if ($response->status() == 404) {
            return response()->json([
                'errors' => [
                    [
                        'title' => 'Código de usuario inválido',
                        'detail' => 'El código de usuario proporcionado no es válido.',
                    ]
                ]
            ], 422);
        }
    }
}
