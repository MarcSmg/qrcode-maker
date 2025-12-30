<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\QrCode;

class QrCodeHistoryController extends Controller
{
    public function index() {
        $generatedHistory = QrCode::query()
        ->select('id', 'content', 'scan_count', 'created_at')
        ->orderByDesc('created_at')
        ->get();

        $scannedHistory = DB::table('qr_scans')
        ->join('qr_codes', 'qr_scans.qr_code_id', '=', 'qr_codes.id')
        ->select(
            'qr_codes.id',
            'qr_codes.content',
            'qr_codes.scan_count',
            'qr_scans.created_at as scanned_at'
        )
        ->orderByDesc('qr_scans.created_at')
        ->get();

        return response()->json([
            'generated'=> $generatedHistory,
            'scanned'=> $scannedHistory,
            ]);
    }

}
