<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class sessionController extends Controller
{
    function login(Request $request)
    {
        /*dd($request['data.attributes']);
        */
        $email = $request->input('data.attributes.email');
        $password = $request->input('data.attributes.password');
        if( ! Auth::attempt(['email' => $email, 'password' => $password])){
            return response()->json([ "Error " => "No se encontro"] , 401);
        }
        return response()->json(["Message" => "se pudo"] , 200);
    }
}
