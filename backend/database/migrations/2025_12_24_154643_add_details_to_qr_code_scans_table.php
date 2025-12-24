<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('qr_code_scans', function (Blueprint $table) {
            //
            $table->foreignId('qr_code_id')
                    ->constrained('qr_codes')
                    ->cascadeOnDelete();

            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('qr_code_scans', function (Blueprint $table) {
            //
        });
    }
};
