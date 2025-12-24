<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrCode extends Model
{
    //
    public function scans(){
        return $this->hasMany(QrCodeScan::class);
    }

    protected $fillable = [
        "name",
        'content',
        "type",
    ];

}
