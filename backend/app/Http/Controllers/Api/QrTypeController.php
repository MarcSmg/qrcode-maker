<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QrType;
use Illuminate\Http\JsonResponse;

class QrTypeController extends Controller
{
    /**
     * Récupère tous les types de QR codes disponibles
     */
    public function index(): JsonResponse
    {
        $types = QrType::select(['id', 'name', 'display_name', 'description'])
            ->orderBy('display_name')
            ->get();
            
        return response()->json([
            'data' => $types
        ]);
    }
    
    /**
     * Affiche les détails d'un type de QR code spécifique
     */
    public function show(QrType $qrType): JsonResponse
    {
        return response()->json([
            'data' => $qrType->only(['id', 'name', 'display_name', 'description'])
        ]);
    }
}
