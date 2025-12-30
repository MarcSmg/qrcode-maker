<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QrType;

class QrTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            [
                'name' => 'website',
                'display_name' => 'Website',
                'description' => 'Lien vers un site web',
            ],
            [
                'name' => 'text',
                'display_name' => 'Text',
                'description' => 'Texte simple',
            ],
            [
                'name' => 'social',
                'display_name' => 'Social',
                'description' => 'Profil de réseau social',
            ],
            [
                'name' => 'pdf',
                'display_name' => 'PDF',
                'description' => 'Document PDF téléchargeable',
            ],
            [
                'name' => 'email',
                'display_name' => 'Email',
                'description' => 'Envoyer un mail',
            ]
        ];

        foreach ($types as $type) {
            QrType::updateOrCreate(
                ['name' => $type['name']],
                $type
            );
        }
    }
}
