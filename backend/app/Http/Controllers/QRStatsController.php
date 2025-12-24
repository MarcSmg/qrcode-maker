<?php
// app/Http\Controllers/QRStatsController.php

namespace App\Http\Controllers;

use App\Services\QRStatsService;
use Illuminate\Http\Request;

class QRStatsController extends Controller
{
    /**
     * Le service de statistiques.
     * @var QRStatsService
     */
    protected $statsService;

    /**
     * Constructeur : injection du service.
     */
    public function __construct(QRStatsService $statsService)
    {
        $this->statsService = $statsService;
    }

    /**
     * Affiche les statistiques basiques pour un QR Code.
     */
    public function showBasicStats(int $qrCodeId, Request $request)
    {
        // Récupère la période depuis l'URL (?period=week). Valeur par défaut : 'all'
        $period = $request->query('period', 'all');

        // Appelle le service pour faire les calculs
        $statsData = $this->statsService->getBasicStats($qrCodeId, $period);

        // Passe les données à la vue pour affichage
        return view('qr-stats.basic', $statsData);
    }


   /**
 * Affiche les graphiques des scans par jour pour un QR Code.
 *
 * @param int $qrCodeId L'ID du QR Code
 * @param Request $request Pour récupérer le paramètre GET 'days'
 * @return \Illuminate\View\View
 */
public function showGraphics(int $qrCodeId, Request $request)
{
    // 1. Récupère le nombre de jours depuis l'URL (?days=30)
    $days = $request->query('days', 30); // Valeur par défaut : 30 jours
    
    // 2. Liste des périodes autorisées
    $allowedDays = [7, 30, 90];
    $allowAll = true; // Autoriser "all" comme option
    
    // 3. Valide et ajuste la valeur de $days
    if ($days === 'all') {
        $days = 365; // Pour "all", on prend une grande période
    } elseif (!in_array((int)$days, $allowedDays)) {
        $days = 30; // Valeur par défaut si invalide
    } else {
        $days = (int)$days; // Assure que c'est un entier
    }
    
    // 4. Récupère les données du graphique depuis le Service
    $chartData = $this->statsService->getScansPerDay($qrCodeId, $days);
    
    // 5. Récupère aussi le QR Code pour afficher ses infos
    $qrCode = \App\Models\QRCode::findOrFail($qrCodeId);
    
    // 6. Récupère les stats basiques pour afficher en plus
    $basicStats = $this->statsService->getBasicStats($qrCodeId, 'all');
    
// Dans la méthode showGraphics, avant le return view :
    dd ([
    'chartData' => $chartData,
    'qrCode' => $qrCode,
    'days' => $days
]);


    // 7. Passe toutes les données à la vue
    return view('qr-stats.graphics', [
        'chartData' => $chartData,
        'qrCode' => $qrCode,
        'qrCodeId' => $qrCodeId,
        'days' => $days,
        'requestedDays' => $request->query('days', 30), // Garde la valeur originale
        'basicStats' => $basicStats,
        'periods' => [
            ['value' => 7, 'label' => '7 derniers jours'],
            ['value' => 30, 'label' => '30 derniers jours'],
            ['value' => 90, 'label' => '90 derniers jours'],
            ['value' => 'all', 'label' => 'Toute la période']
        ]
    ]);
}


}