<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Http;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    static function apiUserCodigo($codigo)
    {
        return Http::get("http://localhost/api_uni/api.php?action=get_userCodigo&codigo=$codigo");
    }

    static function apiUsers()
    {
        $response = Http::get("http://localhost/api_uni/api.php?action=list_users");
        return $response;
    }

    static function apiUserId($id)
    {
        $response = Http::get("http://localhost/api_uni/api.php?action=get_userId&id=$id");
        return $response;
    }

    static function apiUsersFilter($filter)
    {
        return Http::get("http://localhost/api_uni/api.php?action=filtrar_users&busqueda=$filter");
    }

    static function apiUsersbyCarrera($carrera)
    {
        return Http::get("http://localhost/api_uni/api.php?action=get_students_by_carrera&carrera=$carrera");
    }
    static function apiUsersbySemestre($semestre)
    {
        return Http::get("http://localhost/api_uni/api.php?action=get_students_by_semestre&semestre=$semestre");
    }
}
