<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function (Request $request) {
    return "API";
});


Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);

use App\Http\Controllers\Api\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());
    Route::post('/logout',
 [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum','verified'])->group(function() {
    Route::get('/dashboard', fn () =>'Email verified access');
});     

Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

 
