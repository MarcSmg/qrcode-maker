<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class QrCodeStatsController extends Controller
{
    public function index(){

        $generated = DB::table('qr_codes')
        ->join('qr_types', 'qr_codes.type_id', '=', 'qr_types.id')
        ->select(
            'qr_types.id as type_id',
            'qr_types.name as type',
            DB::raw('COUNT(qr_codes.id) as count')
        )
        ->groupBy('qr_types.id', 'qr_types.name')
        ->get();

        $scanned = DB::table('qr_scans')
        ->join('qr_codes', 'qr_scans.qr_code_id', '=', 'qr_codes.id')
        ->join('qr_types', 'qr_codes.type_id', '=', 'qr_types.id')
        ->select(
            'qr_types.id as type_id',
            'qr_types.name as type',
            DB::raw('COUNT(qr_scans.id) as count')
        )
        ->groupBy('qr_types.id', 'qr_types.name')
        ->get();

        $active = DB::table('qr_codes')
        ->join('qr_types', 'qr_codes.type_id', '=', 'qr_types.id')
        ->where('qr_codes.is_active', true)
        ->select(
            'qr_types.id as type_id',
            'qr_types.name as type',
            DB::raw('COUNT(qr_codes.id) as count')
        )
        ->groupBy('qr_types.id', 'qr_types.name')
        ->get();

        return response()->json([
            'generated' => $generated,
            'scanned'   => $scanned,
            'active'    => $active,
        ]);
}

}
