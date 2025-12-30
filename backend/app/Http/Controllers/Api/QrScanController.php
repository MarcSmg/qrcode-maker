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

    public function scan(string $code, Request $request){

        $qrCode = QrCode::where('short_code', $code)->first();

        if (! $qrCode) {
            abort(404, 'QR code introuvable');
        }

        if (! $qrCode->is_active) {
            abort(410, 'QR code désactivé');
        }

        if ($qrCode->isReachedScanLimit()) {
            abort(429, 'Limite de scans atteinte');
        }

        $qrCode->scans()->create([
            'qr_code_id' => $qrCode->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        $qrCode->increment('scan_count');

        switch ($qrCode->type->name) {
            case 'website':
                return $this->handleWebsite($qrCode);

            case 'text':
                return $this->handleText($qrCode);

            case 'pdf':
                return $this->handlePdf($qrCode);

            case 'social':
                return $this->handleSocial($qrCode);

            default:
                abort(400, 'Type de QR non supporté');
        }

    }

    protected function handleWebsite(QrCode $qrCode){
        return redirect()->away($qrCode->content);
    }

    protected function handleText(QrCode $qrCode){
        
        return $qrCode->content;
    }

    protected function handleSocial(QrCode $qrCode){
        return redirect()->away($qrCode->content);
    }

    protected function handlePdf(QrCode $qrCode){

        return response()->file(
            storage_path('app/private/' . $qrCode->content)
        );
    }

}