<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Casts\Attribute;

use Illuminate\Database\Eloquent\Model;

class QrCode extends Model
{
    //
    public function scans(){
        return $this->hasMany(QrScan::class);
    }

    protected $fillable = [
        "user_id",
        "type_id",
        "short_code",
        "scan_limit",
        "scan_count",
        "name",
        "content",
        "is_active",
        "design",
        "metadata",
    ];

    protected $casts = [
        'design' => 'array',
        'metadata' => 'array',
    ];

    public function type(){
        return $this->belongsTo(QrType::class, 'type_id');
    }

    public function isReachedScanLimit(): bool {
        if (is_null($this->scan_limit)) {
            return false; // illimité
        }

        return $this->scan_count >= $this->scan_limit;
    }


    protected $appends = ['code_url'];

    public function codeUrl(): Attribute{
        return Attribute::make(
            get: fn () => rtrim(config('app.domain'), '/') . '/r/' . $this->short_code
        );
    }

}
