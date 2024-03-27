<?php

use App\Http\Controllers\sessionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('logout' , [SessionController::class , 'logout'])->name('api.user.logout');
});

Route::post('user' , [UserController::class, 'create'])->name('api.user.create');
Route::post('login' , [SessionController::class , 'login'])->name('api.user.login');
