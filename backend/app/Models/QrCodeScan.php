<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrCodeScan extends Model
{
    //
    public function qrCode()
{
    return $this->belongsTo(QrCode::class);
}

protected $fillable = [
    'qr_code_id',
    'ip_address',
    'user_agent',
];

}
