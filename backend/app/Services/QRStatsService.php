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



/**
 * Récupère les données pour le graphique des scans par jour.
 *
 * @param int $qrCodeId L'ID du QR Code
 * @param int $days Nombre de jours à analyser (par défaut 30)
 * @return array Tableau avec labels (dates) et données (nombre de scans)
 */
public function getScansPerDay(int $qrCodeId, int $days = 30): array
{
    // 1. Récupère le QR Code
    $qrCode = QRCode::findOrFail($qrCodeId);
    
    // 2. Calcule la date de début (il y a X jours)
    $startDate = Carbon::now()->subDays($days);
    
    // 3. Récupère les scans groupés par jour
    $scansPerDay = $qrCode->scans()
        ->where('scanned_at', '>=', $startDate)
        ->selectRaw('DATE(scanned_at) as date, COUNT(*) as count')
        ->groupBy('date')
        ->orderBy('date', 'asc')
        ->get()
        ->pluck('count', 'date'); // Format: ['2024-01-01' => 5, '2024-01-02' => 8]
    
    // 4. Crée une période complète pour éviter les jours sans données
    $period = \Carbon\CarbonPeriod::create($startDate, Carbon::now());
    
    $labels = [];
    $data = [];
    
    // 5. Pour chaque jour de la période
    foreach ($period as $date) {
        $dateStr = $date->format('Y-m-d');
        
        // Format de date pour l'affichage (ex: "01 Déc")
        $labels[] = $date->format('d M');
        
        // Nombre de scans ce jour (0 si aucun)
        $data[] = $scansPerDay->get($dateStr, 0);
    }
    
    // 6. Retourne les données formatées pour Chart.js
    return [
        'labels' => $labels,
        'data' => $data,
        'total_days' => $days,
        'total_scans' => array_sum($data),
        'average_scans' => count($data) > 0 ? array_sum($data) / count($data) : 0
    ];
}






}