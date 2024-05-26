<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public static function transl_to_en_carbon($string){
        $string = preg_replace('/^(enero)\b/i', 'January', $string);
        $string = preg_replace('/^(febrero)\b/i', 'February', $string);
        $string = preg_replace('/^(marzo)\b/i', 'March', $string);
        $string = preg_replace('/^(abril)\b/i', 'April', $string);
        $string = preg_replace('/^(mayo)\b/i', 'May', $string);
        $string = preg_replace('/^(junio)\b/i', 'June', $string);
        $string = preg_replace('/^(julio)\b/i', 'July', $string);
        $string = preg_replace('/^(agosto)\b/i', 'August', $string);
        $string = preg_replace('/^(septiembre)\b/i', 'September', $string);
        $string = preg_replace('/^(octubre)\b/i', 'October', $string);
        $string = preg_replace('/^(noviembre)\b/i', 'November', $string);
        $string = preg_replace('/^(diciembre)\b/i', 'December', $string);
        return $string;
    }

}
