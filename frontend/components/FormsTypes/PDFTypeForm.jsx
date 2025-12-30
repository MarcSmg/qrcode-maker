import React, { useState, useEffect } from 'react';
import '../../styles/Stats.css';

export default function Stats() {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem('token'); // Adjust if you store it elsewhere

                const response = await fetch('http://localhost:8000/api/qrcodes/stats', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...(token && { 'Authorization': `Bearer ${token}` }),
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }

                const result = await response.json();

                // Transform the backend data into frontend format
                const transformData = (dataArray) => {
                    const map = {
                        email: 0,
                        link: 0,
                        image: 0,
                    };

                    dataArray.forEach(item => {
                        const type = item.type.toLowerCase(); // e.g., "Email" → "email"
                        if (type.includes('email')) map.email = item.count;
                        else if (type.includes('url') || type.includes('link') || type.includes('website')) map.link = item.count;
                        else if (type.includes('image') || type.includes('pdf') || type.includes('mp3')) map.image = item.count;
                        // Add more mappings if you have other types
                    });

                    return map;
                };

                const generatedByType = transformData(result.generated);
                const scannedByType = transformData(result.scanned);
                const activeByType = transformData(result.active);

                const totalGenerated = Object.values(generatedByType).reduce((a, b) => a + b, 0);
                const totalScanned = Object.values(scannedByType).reduce((a, b) => a + b, 0);
                const activeQRCodes = Object.values(activeByType).reduce((a, b) => a + b, 0);

                setStatsData({
                    totalGenerated,
                    totalScanned,
                    activeQRCodes,
                    generatedByType,
                    scannedByType,
                    activeByType,
                });

            } catch (err) {
                console.error("Failed to load stats:", err);
                setError("Impossible de charger les statistiques pour le moment.");

                // Fallback to mock data so UI doesn't break
                setStatsData({
                    totalGenerated: 0,
                    totalScanned: 0,
                    activeQRCodes: 0,
                    generatedByType: { email: 0, link: 0, image: 0 },
                    scannedByType: { email: 0, link: 0, image: 0 },
                    activeByType: { email: 0, link: 0, image: 0 },
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="stats-container">Chargement des statistiques...</div>;
    }

    if (error) {
        return <div className="stats-container"><p style={{ color: 'red' }}>{error}</p></div>;
    }

    return (
        <div className="stats-container">
            <div className="stats-header">
                <h2 className="stats-title">Statistiques</h2>
                <p className="stats-subtitle">
                    Vue d'ensemble de l'activité de vos QR codes
                </p>
            </div>

            <div className='stats-cards-container no-scrollbar'>
                <div className="stats-cards-grid">
                    {/* 1. CODES GÉNÉRÉS */}
                    <div className="stats-card">
                        <div className="stats-card-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <rect x="16" y="16" width="3" height="3" rx="0.5" />
                            </svg>
                        </div>

                        <div className="stats-card-content">
                            <span className="stats-card-label">Codes générés</span>
                            <span className="stats-card-value">{statsData.totalGenerated}</span>
                            <span className="stats-card-period">ce mois</span>

                            <div className="stats-card-details">
                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">@</div>
                                        <span>Email</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.generatedByType.email}
                                    </span>
                                </div>

                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">🔗</div>
                                        <span>Lien</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.generatedByType.link}
                                    </span>
                                </div>

                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">🖼</div>
                                        <span>Image</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.generatedByType.image}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. CODES SCANNÉS */}
                    <div className="stats-card">
                        <div className="stats-card-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </div>

                        <div className="stats-card-content">
                            <span className="stats-card-label">Codes scannés</span>
                            <span className="stats-card-value">{statsData.totalScanned}</span>
                            <span className="stats-card-period">total</span>

                            <div className="stats-card-details">
                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">@</div>
                                        <span>Email</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.scannedByType.email}
                                    </span>
                                </div>

                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">🔗</div>
                                        <span>Lien</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.scannedByType.link}
                                    </span>
                                </div>

                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">🖼</div>
                                        <span>Image</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.scannedByType.image}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. CODES ACTIFS */}
                    <div className="stats-card">
                        <div className="stats-card-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>

                        <div className="stats-card-content">
                            <span className="stats-card-label">Codes actifs</span>
                            <span className="stats-card-value">{statsData.activeQRCodes}</span>
                            <span className="stats-card-period">en circulation</span>

                            <div className="stats-card-details">
                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">@</div>
                                        <span>Email</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.activeByType.email}
                                    </span>
                                </div>

                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">🔗</div>
                                        <span>Lien</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.activeByType.link}
                                    </span>
                                </div>

                                <div className="stats-card-details-item">
                                    <div className="stats-card-details-item-label">
                                        <div className="stats-card-details-item-icon">🖼</div>
                                        <span>Image</span>
                                    </div>
                                    <span className="stats-card-details-item-value">
                                        {statsData.activeByType.image}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}