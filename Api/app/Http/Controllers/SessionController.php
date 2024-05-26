<?php

namespace App\Http\Controllers;

use App\Http\Requests\SessionRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class sessionController extends Controller
{
    function login(SessionRequest $request)
    {
        $email = $request->input('data.attributes.email');
        $password = $request->input('data.attributes.password');
        if(User::where('email', $email)->first()){
            if (!Auth::attempt(['email' => $email, 'password' => $password])) {
                $exception = ValidationException::withMessages([
                    "data.attributes.password" => "The password is incorrect"
                ]);
                $exception->status = 401;
                throw $exception;
            }
        }else{
            $exception = ValidationException::withMessages([
                "data.attributes.email" => "the account does not exist"
            ]);
            $exception->status = 401;
            throw $exception;
        }

        $user = Auth::user();
        if ($user->state == '0') {
            $exception = ValidationException::withMessages([
                "data.attributes.email" => "Your account is suspended, communicating with the administrator"
            ]);
            $exception->status = 403;
            throw $exception;
        }

        return AuthResource::make($user);
    }

    function logout(Request $request)
    {
        try{
            $user = Auth::user();
            if($user){
                $request->user()->tokens()->delete();
                return response()->json([], 204);
            }
        }catch(Exception $e){
            return response()->json(['error servidor' , $e->getMessage()] , 500);
        }
    }
}
