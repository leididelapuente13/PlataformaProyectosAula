<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class sessionController extends Controller
{
    function login(Request $request)
    {

        $request->validate([
            "data.attributes.email" => ["required"],
            "data.attributes.password" => "required",
        ]);


        $email = $request->input('data.attributes.email');
        $password = $request->input('data.attributes.password');
        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            return response()->json([
                'errors' => [
                    [
                        'title' => 'Incorrect credentials',
                        'detail' => 'Password or email incorrect try again',
                        'source' => ['pointer' => "/data/attributes/credentials"]
                    ]
                ]
            ], 422);
        }
        $user = Auth::user();
        if ($user->state == '0') {
            return response()->json([
                'errors' => [
                    [
                        'title' => 'Authentication failed',
                        'detail' => 'Your account is suspended, communicating with the administrator',
                        'source' => ['pointer' => "/data/attributes/credentials"]
                    ]
                ]
            ], 403);
        }

        return UserResource::make($user);
    }
}
