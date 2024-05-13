<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }
    function userState($id){
        $value = $this->userService->userState($id);

        if($value === null){
            return response()->json([], 404);
        }
        if($value === false){
            return response()->json([], 500);
        }
        return response()->json([], 204);
    }
}
