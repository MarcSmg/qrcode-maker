<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('qr_codes', function (Blueprint $table) {
            // Change existing column to JSON (keeps data if possible)
            $table->json('design')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('qr_codes', function (Blueprint $table) {
            // Revert to text (or whatever it was before)
            $table->text('design')->nullable()->change();
        });
    }
};