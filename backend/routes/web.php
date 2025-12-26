<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QRStatsController;
use App\Http\Controllers\Api\QrScanController;

// Route racine
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Routes d'authentification
require __DIR__.'/auth.php';

// Routes protégées par authentification
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    });
    // Tu pourras mettre d'autres routes protégées ici plus tard
});

// Route pour scanner un QR code (accessible sans auth probablement)
Route::get('/qr/{uuid}', [QrScanController::class, 'handle']);

// TES NOUVELLES ROUTES POUR LES STATISTIQUES
// Route pour les statistiques basiques d'un QR Code
// Exemple d'URL : /qr-codes/15/stats?period=month
Route::get('/qr-codes/{qrCode}/stats', [QRStatsController::class, 'showBasicStats'])
    ->name('qr.basic-stats') // Nom de route pour faciliter les liens
    ->whereNumber('qrCode'); // Validation : assure que {qrCode} est un nombre

// Tu peux ajouter d'autres routes pour les stats ici plus tard, par exemple :
// Route::get('/qr-codes/{qrCode}/advanced-stats', [QRStatsController::class, 'showAdvancedStats']);
// Route::get('/qr-codes/{qrCode}/export', [QRStatsController::class, 'exportStats']);

Route::get('/test-graphics/{qrCodeId}', [QRStatsController::class, 'showGraphics']);

// Après la route des stats basiques, ajoute :

// Route pour les graphiques
Route::get('/qr-codes/{qrCode}/graphics', [QRStatsController::class, 'showGraphics'])
    ->name('qr.graphics')
    ->whereNumber('qrCode');


    