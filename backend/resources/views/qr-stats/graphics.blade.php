{{-- resources/views/qr-stats/graphics.blade.php --}}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Graphiques - QR Code #{{ $qrCode->id }}</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <style>
        .stat-card {
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .period-btn {
            transition: all 0.2s ease;
        }
        .chart-container {
            position: relative;
            height: 400px;
            width: 100%;
        }
        .metric-badge {
            font-size: 0.85em;
            padding: 4px 10px;
        }
    </style>
</head>
<body>
    <div class="container py-4">
        <!-- En-tête -->
        <div class="row mb-4">
            <div class="col-12">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ route('qr.basic-stats', ['qrCode' => $qrCode->id]) }}">Statistiques</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Graphiques</li>
                    </ol>
                </nav>
                
                <h1 class="display-5">
                    <i class="fas fa-chart-line text-primary"></i>
                    Analyse Graphique
                </h1>
                <p class="lead">
                    QR Code #{{ $qrCode->id }} - {{ Str::limit($qrCode->content, 60) }}
                </p>
            </div>
        </div>

        <!-- Métriques rapides -->
        <div class="row mb-4">
            <div class="col-md-3 mb-3">
                <div class="card stat-card border-primary">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Période analysée</h6>
                        <h3 class="card-title">
                            @if($days == 365)
                                <i class="fas fa-infinity text-primary"></i> Toute période
                            @else
                                {{ $days }} jours
                            @endif
                        </h3>
                        <p class="card-text small">du {{ \Carbon\Carbon::now()->subDays($days)->format('d/m/Y') }} au {{ now()->format('d/m/Y') }}</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card stat-card border-success">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Total scans</h6>
                        <h3 class="card-title">{{ $chartData['total_scans'] }}</h3>
                        <p class="card-text small">sur {{ $days }} jours</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card stat-card border-info">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Moyenne/jour</h6>
                        <h3 class="card-title">{{ round($chartData['average_scans'], 1) }}</h3>
                        <p class="card-text small">scans par jour en moyenne</p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3 mb-3">
                <div class="card stat-card border-warning">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Jours actifs</h6>
                        <h3 class="card-title">
                            {{ count(array_filter($chartData['data'], function($val) { return $val > 0; })) }}
                        </h3>
                        <p class="card-text small">jours avec au moins 1 scan</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtres de période -->
        <div class="card mb-4 shadow-sm">
            <div class="card-header bg-light">
                <h5 class="mb-0">
                    <i class="fas fa-calendar-alt me-2"></i>
                    Choisir la période d'analyse
                </h5>
            </div>
            <div class="card-body">
                <div class="btn-group" role="group" aria-label="Périodes">
                    @foreach($periods as $periodItem)
                        <a href="{{ route('qr.graphics', ['qrCode' => $qrCode->id, 'days' => $periodItem['value']]) }}"
                           class="btn btn-outline-primary period-btn {{ $requestedDays == $periodItem['value'] ? 'active' : '' }}">
                            <i class="fas fa-{{ $periodItem['value'] == 'all' ? 'infinity' : 'calendar' }} me-1"></i>
                            {{ $periodItem['label'] }}
                        </a>
                    @endforeach
                </div>
                
                <div class="mt-3 text-muted small">
                    <i class="fas fa-info-circle me-1"></i>
                    Le graphique montre l'évolution quotidienne des scans.
                </div>
            </div>
        </div>

        <!-- Graphique principal -->
        <div class="card shadow-lg mb-4">
            <div class="card-header bg-white border-bottom-0">
                <h4 class="mb-0">
                    <i class="fas fa-chart-line text-success me-2"></i>
                    Évolution des scans par jour
                </h4>
            </div>
            <div class="card-body p-4">
                <div class="chart-container">
                    <canvas id="scansChart"></canvas>
                </div>
                
                @if($chartData['total_scans'] == 0)
                    <div class="alert alert-info mt-3">
                        <i class="fas fa-info-circle me-2"></i>
                        Aucun scan enregistré sur cette période.
                    </div>
                @endif
            </div>
        </div>

        <!-- Statistiques détaillées -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <i class="fas fa-list-ol me-2"></i>
                            Résumé des données
                        </h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Scans maximum sur un jour
                                <span class="badge bg-primary metric-badge">
                                    {{ max($chartData['data']) }}
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Scans minimum sur un jour
                                <span class="badge bg-secondary metric-badge">
                                    {{ min($chartData['data']) }}
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Jours sans scans
                                <span class="badge bg-warning metric-badge">
                                    {{ count(array_filter($chartData['data'], function($val) { return $val == 0; })) }}
                                </span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Tendance
                                <span class="badge {{ $chartData['data'][count($chartData['data'])-1] >= $chartData['data'][0] ? 'bg-success' : 'bg-danger' }} metric-badge">
                                    @if($chartData['data'][count($chartData['data'])-1] > $chartData['data'][0])
                                        <i class="fas fa-arrow-up me-1"></i> Hausse
                                    @elseif($chartData['data'][count($chartData['data'])-1] < $chartData['data'][0])
                                        <i class="fas fa-arrow-down me-1"></i> Baisse
                                    @else
                                        <i class="fas fa-equals me-1"></i> Stable
                                    @endif
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-header">
                        <h5 class="mb-0">
                            <i class="fas fa-lightbulb me-2"></i>
                            Conseils d'analyse
                        </h5>
                    </div>
                    <div class="card-body">
                        @if($chartData['average_scans'] == 0)
                            <div class="alert alert-warning">
                                <strong>Aucun scan détecté</strong><br>
                                Pensez à promouvoir votre QR code.
                            </div>
                        @elseif($chartData['average_scans'] < 5)
                            <div class="alert alert-info">
                                <strong>Faible activité</strong><br>
                                Votre QR code est peu scanné. Pensez à améliorer sa visibilité.
                            </div>
                        @elseif($chartData['average_scans'] > 20)
                            <div class="alert alert-success">
                                <strong>Excellente performance</strong><br>
                                Votre QR code est très populaire !
                            </div>
                        @else
                            <div class="alert alert-secondary">
                                <strong>Activité régulière</strong><br>
                                Votre QR code a une audience stable.
                            </div>
                        @endif
                        
                        <div class="mt-3">
                            <h6>Points d'attention :</h6>
                            <ul class="small">
                                <li>Les pics représentent des jours de forte activité</li>
                                <li>Les creux peuvent indiquer des problèmes de visibilité</li>
                                <li>Une tendance à la hausse est signe de croissance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Boutons d'action -->
        <div class="d-flex justify-content-between mt-4">
            <div>
                <a href="{{ route('qr.basic-stats', ['qrCode' => $qrCode->id]) }}" class="btn btn-outline-secondary">
                    <i class="fas fa-arrow-left me-1"></i> Retour aux statistiques
                </a>
                <a href="/dashboard" class="btn btn-outline-primary ms-2">
                    <i class="fas fa-tachometer-alt me-1"></i> Tableau de bord
                </a>
            </div>
            <div>
                <button onclick="exportChart()" class="btn btn-success">
                    <i class="fas fa-download me-1"></i> Exporter le graphique
                </button>
                <button onclick="window.print()" class="btn btn-outline-dark ms-2">
                    <i class="fas fa-print me-1"></i> Imprimer
                </button>
            </div>
        </div>
        
        <!-- Pied de page -->
        <footer class="mt-5 pt-4 border-top text-center text-muted">
            <small>
                <i class="fas fa-chart-pie"></i> Module de visualisation graphique
                • Données mises à jour en temps réel
                • Généré le {{ now()->format('d/m/Y à H:i') }}
            </small>
        </footer>
    </div>

    <!-- Script Chart.js -->
    <script>
        // Données depuis le controller
        const chartLabels = @json($chartData['labels']);
        const chartData = @json($chartData['data']);
        
        // Création du graphique
        const ctx = document.getElementById('scansChart').getContext('2d');
        const scansChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Nombre de scans par jour',
                    data: chartData,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.05)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#4f46e5',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                family: "'Segoe UI', Roboto, sans-serif"
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 14 },
                        bodyFont: { size: 14 },
                        padding: 12
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            maxRotation: 45
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 12
                            },
                            precision: 0
                        },
                        title: {
                            display: true,
                            text: 'Nombre de scans',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest'
                }
            }
        });
        
        // Fonction pour exporter le graphique
        function exportChart() {
            const link = document.createElement('a');
            link.download = 'graphique-scans-qr-{{ $qrCode->id }}-{{ now()->format("Y-m-d") }}.png';
            link.href = scansChart.toBase64Image();
            link.click();
        }
        
        // Animation au chargement
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.stat-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });
    </script>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Helper pour Str::limit si besoin -->
    @if(!function_exists('Str'))
    <script>
        // Fallback si Str n'est pas disponible
        window.Str = {
            limit: function(text, limit) {
                return text.length > limit ? text.substring(0, limit) + '...' : text;
            }
        };
    </script>
    @endif
</body>
</html>