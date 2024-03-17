<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class sessionController extends Controller
{
    function login(Request $request){

        Auth::attempt([$request->only([$request->email, $request->password])]);

    }
}
