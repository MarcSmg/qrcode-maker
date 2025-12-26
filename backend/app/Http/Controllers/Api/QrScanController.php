<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QrCode;
use App\Models\QrScan;

class QrScanController extends Controller
{
    /**
     * Gère le scan d'un QR code par son UUID
     */
    public function handle($uuid)
    {
        // 1. Trouver le QR code par UUID
        $qrCode = QrCode::where('uuid', $uuid)->first();
        
        if (!$qrCode) {
            return response()->json([
                'error' => 'QR Code non trouvé',
                'uuid' => $uuid
            ], 404);
        }
        
        // 2. Enregistrer le scan
        $scan = QrScan::create([
            'qr_code_id' => $qrCode->id,
            'scanned_at' => now(),
            'ip' => request()->ip(),
            'device_type' => $this->getDeviceType(),
            'is_unique' => $this->checkIfUniqueScan($qrCode->id, request()->ip())
        ]);
        
        // 3. Rediriger ou retourner une réponse selon le type de QR code
        if ($qrCode->type === 'url') {
            return redirect($qrCode->content);
        } elseif ($qrCode->type === 'text') {
            return view('qr.text', [
                'content' => $qrCode->content,
            ]);
        } else {
            return response()->json([
                'message' => 'Scan enregistré avec succès',
                'qr_code' => $qrCode,
                'scan_id' => $scan->id
            ]);
        }
    }
    
    /**
     * Détermine le type d'appareil
     */
    private function getDeviceType()
    {
        $userAgent = request()->userAgent();
        
        if (strpos($userAgent, 'Mobile') !== false) {
            return 'mobile';
        } elseif (strpos($userAgent, 'Tablet') !== false) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }
    
    /**
     * Vérifie si le scan est unique (même IP dans les dernières 24h)
     */
    private function checkIfUniqueScan($qrCodeId, $ip)
    {
        $recentScan = QrScan::where('qr_code_id', $qrCodeId)
            ->where('ip', $ip)
            ->where('scanned_at', '>', now()->subDay())
            ->first();
            
        return !$recentScan; // Unique si aucun scan récent trouvé
    }
}