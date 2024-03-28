<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Http;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    static function apiUser($codigo)
    {
        $response = Http::get("http://localhost/api_uni/api.php?action=get_userCodigo&codigo=$codigo");

        return $response;
    }

    static function apiUsers(){
        $response = Http::get("http://localhost/api_uni/api.php?action=list_users");
        return $response;
    }

    static function apiUserId($id){
        $response = Http::get("http://localhost/api_uni/api.php?action=get_userId&id=$id");
        return $response;
    }


}
