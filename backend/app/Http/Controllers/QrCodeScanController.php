<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QrCode;
use App\Models\QrCodeScan;
class QrCodeScanController extends Controller
{
    //
        public function handle(string $uuid, Request $request)
    {
        $qrCode = QrCode::where('uuid', $uuid)->firstOrFail();

        QrCodeScan::create([
            'qr_code_id' => $qrCode->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return redirect()->to($qrCode->destination_url);
    }
}
