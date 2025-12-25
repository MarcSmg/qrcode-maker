<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrScan extends Model
{
    protected $fillable = [
        'qr_code_id',
        'ip_address',
        'user_agent',
        'country',
        'city',
        'latitude',
        'longitude'
    ];

    public function qrCode()
    {
        return $this->belongsTo(QrCode::class, 'qr_code_id');
    }
}
