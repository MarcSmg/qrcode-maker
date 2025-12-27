<?php

namespace Database\Seeders;

use App\Models\QrType;
use Illuminate\Database\Seeder;

class QrTypesTableSeeder extends Seeder
{
    public function run()
    {
        $types = [
            [
                'name' => 'website',
                'display_name' => 'Site Web',
                'description' => 'Lien vers un site web',
            ],
            [
                'name' => 'social_media',
                'display_name' => 'Réseaux Sociaux',
                'description' => 'Lien vers des profils sociaux',
            ],
            [
                'name' => 'pdf',
                'display_name' => 'PDF',
                'description' => 'Lien vers un fichier PDF',
            ],
            [
                'name' => 'text',
                'display_name' => 'Texte',
                'description' => 'Texte simple',
            ],
        ];

        foreach ($types as $type) {
            QrType::create($type);
        }
    }
}
