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
}