<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('qr_codes', function (Blueprint $table) {
            // Ajout des champs manquants
            if (!Schema::hasColumn('qr_codes', 'short_code')) {
                $table->string('short_code', 8)->unique()->after('id');
            }
            
            if (!Schema::hasColumn('qr_codes', 'content')) {
                $table->text('content')->after('name');
            }
            
            if (!Schema::hasColumn('qr_codes', 'scan_limit')) {
                $table->integer('scan_limit')->nullable()->after('content');
            }
            
            if (!Schema::hasColumn('qr_codes', 'scan_count')) {
                $table->integer('scan_count')->default(0)->after('scan_limit');
            }
            
            if (!Schema::hasColumn('qr_codes', 'design')) {
                $table->json('design')->nullable()->after('scan_count');
            }
            
            if (!Schema::hasColumn('qr_codes', 'metadata')) {
                $table->json('metadata')->nullable()->after('design');
            }
            
            if (!Schema::hasColumn('qr_codes', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('metadata');
            }
            
            // Ajout d'un index pour les recherches par utilisateur et type
            $table->index(['user_id', 'type_id']);
        });
    }

    public function down()
    {
        Schema::table('qr_codes', function (Blueprint $table) {
            // Suppression des champs ajoutés
            $table->dropColumn([
                'short_code',
                'content',
                'scan_limit',
                'scan_count',
                'design',
                'metadata',
                'is_active'
            ]);
            
            // Suppression de l'index
            $table->dropIndex(['user_id', 'type_id']);
        });
    }
};
