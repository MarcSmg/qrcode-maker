<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrType extends Model
{
    protected $fillable = ['name', 'display_name', 'description'];
    public function qrcodes(){
        return $this->hasMany(QrCode::class, 'type_id');
    }
}
