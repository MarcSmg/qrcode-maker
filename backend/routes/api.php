<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EmailVerificationController;
use App\Http\Controllers\Api\AuthController;


Route::get('/', function (Request $request) {
    return "API";
});

Route::middleware(['auth:sanctum','verified'])->group(function() {
    Route::get('/dashboard', fn () =>'Email verified access');
}); 

// User related routes

Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

Route::get('/email/verify/{id}/{hash}', EmailVerificationController::class)
    ->middleware(['signed'])
    ->name('verification.verify');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'is.admin'])->get('/users', [UserController::class, 'index']);

// Qr code related routes