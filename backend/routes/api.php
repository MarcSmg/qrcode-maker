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

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/dashboard', fn () =>'Email verified access');
}); 

// Stats
Route::get('/qrcodes/stats', [QrCodeStatsController::class, 'index']);

//History
Route::get('/qrcodes/history', [QrCodeHistoryController::class, 'index']);


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
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

 



// Types de QR code
Route::get('/qr-types', [QrTypeController::class, 'index']);
Route::get('/qr-types/{qrType}', [QrTypeController::class, 'show']);
// QR Codes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('qrcodes', QrCodeController::class)->except(['edit', 'create']);
    Route::post('qrcodes/pdf', [QrCodeController::class, 'storePdf']);
    // Génération de QR code
    Route::get('/qrcodes/generate/{shortCode}', [QrCodeController::class, 'generateQrCode']);
    
    Route::get('/qrcodes/stats/{qrcode}', [QrCodeController::class, 'getStats']);
    // Routes spécifiques par type de QR code
    // Route::prefix('qrcodes')->group(function () {
    //     // Création de QR code de type texte
    //     Route::post('/text', [QrCodeController::class, 'createTextQrCode']);
        
    //     // Création de QR code de site web
    //     Route::post('/website', [QrCodeController::class, 'createWebsiteQrCode']);
        
    //     // Création de QR code pour réseaux sociaux
    //     Route::post('/social', [QrCodeController::class, 'createSocialQrCode']);
        
    //     // Création de QR code pour PDF
    //     Route::post('/pdf', [QrCodeController::class, 'createPdfQrCode']);
    // });
});

Route::patch('/qrcodes/{qrcode}/design', [QrCodeController::class, 'updateDesign']);
Route::patch('/qrcodes/{qrcode}/status', [QrCodeController::class, 'updateStatus']);
