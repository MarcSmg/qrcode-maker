<?php
// app/Services/QRStatsService.php

namespace App\Services;

use App\Models\QRCode; // Vérifie que ce nom est correct
use App\Models\QRCodeScan; // Vérifie que ce nom est correct (Scan, QrScan, etc.)
use Carbon\Carbon;

class QRStatsService
{
    /**
     * Récupère les statistiques basiques pour un QR Code spécifique.
     *
     * @param int $qrCodeId L'ID du QR Code.
     * @param string $period La période : 'all', 'week', 'month', 'year'.
     * @return array Tableau contenant les statistiques calculées.
     */
    public function getBasicStats(int $qrCodeId, string $period = 'all'): array
    {
        // 1. Récupère le QR Code avec ses scans (relation supposée "scans")
        $qrCode = QRCode::with('scans')->findOrFail($qrCodeId);

        // 2. Démarre une requête sur les scans de ce QR Code
        $scansQuery = $qrCode->scans();

        // 3. Applique le filtre de période sur la colonne 'scanned_at' ou 'created_at'
        // ADAPTE LE NOM DE LA COLONNE ('scanned_at' ou autre) si nécessaire !
        if ($period !== 'all') {
            $dateLimit = match ($period) {
                'day' => Carbon::now()->subDay(),
                'week' => Carbon::now()->subWeek(),
                'month' => Carbon::now()->subMonth(),
                'year' => Carbon::now()->subYear(),
                default => Carbon::now()->subWeek(), // Par défaut, semaine
            };
            $scansQuery->where('scanned_at', '>=', $dateLimit); // ADAPTE ICI
        }

        // 4. Exécute les requêtes pour obtenir les comptes
        $totalScans = $scansQuery->count();

        // 5. Pour les scans uniques : on suppose une colonne 'is_unique' ou un calcul par IP.
        // Si tu as une colonne 'is_unique' :
        $uniqueScans = $scansQuery->where('is_unique', true)->count();
        // SINON, pour un calcul basique par IP unique (moins précis) :
        // $uniqueScans = $scansQuery->distinct('ip_address')->count('ip_address');

        // 6. Calcule le taux de répétition (scans non uniques / total)
        $repeatRate = $totalScans > 0 ? (($totalScans - $uniqueScans) / $totalScans) * 100 : 0;

        // 7. Retourne un tableau propre avec les données
        return [
            'qr_code' => $qrCode, // On envoie aussi l'objet au cas où
            'total_scans' => $totalScans,
            'unique_scans' => $uniqueScans,
            'repeat_rate' => round($repeatRate, 2), // Pourcentage sans le symbole %
            'period' => $period,
            // Tu peux ajouter d'autres métriques facilement ici plus tard
        ];
    }
}