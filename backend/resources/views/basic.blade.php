{{-- resources/views/qr-stats/basic.blade.php --}}

{{-- On suppose que ton projet a un layout principal appelé 'layouts.app' --}}
{{-- S'il a un autre nom, change-le (ex: 'layout.main', 'master', etc.) --}}
@extends('layouts.app')

@section('title', 'Statistiques du QR Code #' . $qr_code->id)

@section('content')
<div class="container py-5">
    {{-- Titre et informations du QR Code --}}
    <div class="card shadow mb-4">
        <div class="card-header bg-primary text-white">
            <h1 class="h3 mb-0">
                <i class="fas fa-chart-bar me-2"></i>Statistiques basiques
            </h1>
        </div>
        <div class="card-body">
            <p class="lead">
                Pour le QR Code : <strong>"{{ Str::limit($qr_code->content, 50) }}"</strong>
            </p>
            <p class="text-muted">
                ID : <code>#{{ $qr_code->id }}</code> | 
                Période analysée : <span class="badge bg-info">{{ $period }}</span>
            </p>
        </div>
    </div>

    {{-- Cartes des métriques --}}
    <div class="row">
        {{-- Carte : Total Scans --}}
        <div class="col-md-4 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Total des Scans
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">
                                {{ number_format($total_scans) }}
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-qrcode fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Carte : Scans Uniques --}}
        <div class="col-md-4 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Scans Uniques
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">
                                {{ number_format($unique_scans) }}
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-check fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Carte : Taux de Répétition --}}
        <div class="col-md-4 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Taux de Répétition
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">
                                {{ $repeat_rate }}%
                            </div>
                            <small class="text-muted">
                                {{-- Explication simple --}}
                                @if($total_scans > 0)
                                    {{ number_format($total_scans - $unique_scans) }} scan(s) répété(s)
                                @endif
                            </small>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-redo fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- Filtres par période --}}
    <div class="card shadow mt-4">
        <div class="card-header bg-light">
            <h6 class="m-0 font-weight-bold text-primary">Filtrer par période</h6>
        </div>
        <div class="card-body">
            <div class="btn-group" role="group">
                @php
                    $periods = [
                        'all' => 'Toute la période',
                        'day' => 'Aujourd\'hui',
                        'week' => '7 derniers jours',
                        'month' => '30 derniers jours',
                        'year' => 'Cette année'
                    ];
                @endphp
                
                @foreach($periods as $key => $label)
                    <a href="{{ route('qr.basic-stats', ['qrCode' => $qr_code->id, 'period' => $key]) }}"
                       class="btn btn-outline-primary {{ $period === $key ? 'active' : '' }}">
                        {{ $label }}
                    </a>
                @endforeach
            </div>
            <p class="mt-3 small text-muted">
                <i class="fas fa-info-circle"></i> Les statistiques sont calculées en temps réel.
            </p>
        </div>
    </div>

    {{-- Bouton de retour (suppose qu'il existe une page listant les QR codes) --}}
    <div class="mt-5">
        <a href="{{ url()->previous() }}" class="btn btn-outline-secondary">
            <i class="fas fa-arrow-left me-1"></i> Retour
        </a>
    </div>
</div>
@endsection

{{-- Section pour les styles CSS spécifiques si besoin --}}
@section('styles')
<style>
    .card {
        border-radius: 0.5rem;
    }
    .border-left-primary {
        border-left: 0.25rem solid #4e73df !important;
    }
    .border-left-success {
        border-left: 0.25rem solid #1cc88a !important;
    }
    .border-left-warning {
        border-left: 0.25rem solid #f6c23e !important;
    }
</style>
@endsection