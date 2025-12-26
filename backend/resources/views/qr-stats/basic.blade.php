{{-- resources/views/qr-stats/basic.blade.php --}}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statistiques QR Code #{{ $qr_code->id ?? 'N/A' }}</title>
    <!-- Bootstrap CSS pour un design propre -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome pour les icônes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .stat-card {
            border-radius: 10px;
            transition: transform 0.3s;
        }
        .stat-card:hover {
            transform: translateY(-5px);
        }
        .badge-period {
            font-size: 0.9em;
            padding: 5px 10px;
        }
        .period-btn.active {
            font-weight: bold;
            background-color: #0d6efd;
            color: white;
        }
        .qr-content {
            background-color: #f8f9fa;
            border-radius: 5px;
            padding: 10px;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <!-- En-tête -->
        <div class="row mb-4">
            <div class="col-12">
                <h1 class="text-center">
                    <i class="fas fa-chart-bar text-primary"></i>
                    Statistiques du QR Code
                </h1>
                <p class="text-center text-muted">
                    Analyse des scans et performances
                </p>
            </div>
        </div>

        <!-- Informations du QR Code -->
        <div class="card shadow-sm mb-4">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">
                    <i class="fas fa-qrcode me-2"></i>
                    Informations du QR Code
                </h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>ID :</strong> <span class="badge bg-secondary">#{{ $qr_code->id ?? 'N/A' }}</span></p>
                        <p><strong>Contenu :</strong></p>
                        <div class="qr-content">
                            {{ $qr_code->content ?? 'Non disponible' }}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Période analysée :</strong></p>
                        <span class="badge bg-info badge-period">
                            @if($period === 'all')
                                <i class="fas fa-infinity me-1"></i> Toute la période
                            @elseif($period === 'day')
                                <i class="fas fa-calendar-day me-1"></i> Dernier jour
                            @elseif($period === 'week')
                                <i class="fas fa-calendar-week me-1"></i> 7 derniers jours
                            @elseif($period === 'month')
                                <i class="fas fa-calendar-alt me-1"></i> 30 derniers jours
                            @elseif($period === 'year')
                                <i class="fas fa-calendar me-1"></i> Cette année
                            @endif
                        </span>
                        <p class="mt-3"><strong>Dernière mise à jour :</strong> {{ now()->format('d/m/Y H:i') }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cartes de statistiques -->
        <div class="row mb-5">
            <!-- Total Scans -->
            <div class="col-md-4 mb-4">
                <div class="card stat-card border-primary shadow">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-eye fa-3x text-primary"></i>
                        </div>
                        <h3 class="card-title">{{ number_format($total_scans ?? 0) }}</h3>
                        <p class="card-text text-muted">Total des Scans</p>
                        <small class="text-muted">
                            Nombre total de scans enregistrés
                        </small>
                    </div>
                </div>
            </div>

            <!-- Scans Uniques -->
            <div class="col-md-4 mb-4">
                <div class="card stat-card border-success shadow">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-user-check fa-3x text-success"></i>
                        </div>
                        <h3 class="card-title">{{ number_format($unique_scans ?? 0) }}</h3>
                        <p class="card-text text-muted">Scans Uniques</p>
                        <small class="text-muted">
                            Utilisateurs différents ayant scanné
                        </small>
                    </div>
                </div>
            </div>

            <!-- Taux de Répétition -->
            <div class="col-md-4 mb-4">
                <div class="card stat-card border-warning shadow">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-redo fa-3x text-warning"></i>
                        </div>
                        <h3 class="card-title">{{ $repeat_rate ?? 0 }}%</h3>
                        <p class="card-text text-muted">Taux de Répétition</p>
                        <small class="text-muted">
                            Pourcentage de scans répétés
                            @if(isset($total_scans) && $total_scans > 0)
                                <br>({{ $total_scans - $unique_scans }} scans répétés)
                            @endif
                        </small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtres par période -->
        <div class="card shadow-sm mb-5">
            <div class="card-header bg-light">
                <h5 class="mb-0">
                    <i class="fas fa-filter me-2"></i>
                    Filtrer par période
                </h5>
            </div>
            <div class="card-body">
                <div class="d-flex flex-wrap gap-2">
                    @php
                        $periods = [
                            'all' => ['Toute la période', 'fas fa-infinity'],
                            'day' => ['Dernier jour', 'fas fa-calendar-day'],
                            'week' => ['7 derniers jours', 'fas fa-calendar-week'],
                            'month' => ['30 derniers jours', 'fas fa-calendar-alt'],
                            'year' => ['Cette année', 'fas fa-calendar']
                        ];
                    @endphp
                    
                    @foreach($periods as $key => [$label, $icon])
                        <a href="{{ route('qr.basic-stats', ['qrCode' => $qr_code->id ?? 1, 'period' => $key]) }}"
                           class="btn btn-outline-primary period-btn {{ $period === $key ? 'active' : '' }}">
                            <i class="{{ $icon }} me-1"></i>
                            {{ $label }}
                        </a>
                    @endforeach
                </div>
                <div class="mt-3 text-muted small">
                    <i class="fas fa-info-circle"></i>
                    Les statistiques sont calculées en temps réel sur la période sélectionnée.
                </div>
            </div>
        </div>

        <!-- Résumé -->
        <div class="card shadow-sm">
            <div class="card-header bg-light">
                <h5 class="mb-0">
                    <i class="fas fa-chart-pie me-2"></i>
                    Résumé
                </h5>
            </div>
            <div class="card-body">
                @if(isset($total_scans) && $total_scans > 0)
                    @php
                        $uniquePercent = ($unique_scans / $total_scans) * 100;
                        $repeatPercent = 100 - $uniquePercent;
                    @endphp
                    <div class="progress mb-3" style="height: 25px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: {{ $uniquePercent }}%">
                            Scans uniques ({{ round($uniquePercent, 1) }}%)
                        </div>
                        <div class="progress-bar bg-warning" role="progressbar" style="width: {{ $repeatPercent }}%">
                            Scans répétés ({{ round($repeatPercent, 1) }}%)
                        </div>
                    </div>
                    
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Scans uniques
                            <span class="badge bg-success rounded-pill">{{ $unique_scans }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Scans répétés
                            <span class="badge bg-warning rounded-pill">{{ $total_scans - $unique_scans }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Total des scans
                            <span class="badge bg-primary rounded-pill">{{ $total_scans }}</span>
                        </li>
                    </ul>
                @else
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        Aucun scan enregistré pour cette période.
                    </div>
                @endif
            </div>
        </div>

        <!-- Boutons d'action -->
        <div class="mt-4 mb-5 text-center">
            <a href="{{ url()->previous() }}" class="btn btn-secondary me-2">
                <i class="fas fa-arrow-left me-1"></i> Retour
            </a>
            <button onclick="window.print()" class="btn btn-outline-primary me-2">
                <i class="fas fa-print me-1"></i> Imprimer
            </button>
            <a href="/dashboard" class="btn btn-outline-success">
                <i class="fas fa-tachometer-alt me-1"></i> Dashboard
            </a>
        </div>

        <!-- Pied de page -->
        <footer class="text-center text-muted mt-5 mb-3">
            <hr>
            <small>
                <i class="fas fa-cog"></i> Système de statistiques QR Code
                • Généré le {{ now()->format('d/m/Y à H:i') }}
            </small>
        </footer>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        // Animation simple pour les cartes
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.stat-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = (index * 0.1) + 's';
            });
        });
    </script>
</body>
</html>