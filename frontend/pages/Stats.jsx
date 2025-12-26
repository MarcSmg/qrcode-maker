import React, { useState } from 'react';
import '../styles/Stats.css'

export default function Stats() {
  // Il faudra intégré des appels API ici pour récupérer les vraies données
  const [statsData] = useState({
    totalGenerated: 84,
    totalScanned: 42,
    activeQRCodes: 15,

    // Détails pour les "Codes générés"
    generatedByType: {
      email: 25,
      link: 42,
      image: 17,
    },

    // Détails pour les "Codes scannés"
    scannedByType: {
      email: 8,
      link: 27,
      image: 7,
    },

    // Détails pour les "Codes actifs"
    activeByType: {
      email: 5,
      link: 8,
      image: 2,
    },
  });

  return (
    <div className="stats-container">
      {/* Header */}
      <div className="stats-header">
        <h1 className="stats-title">Statistiques</h1>
        <p className="stats-subtitle">
          Vue d'ensemble de l'activité de vos QR codes
        </p>
      </div>

      {/* Cards verticales */}
      <div className='stats-cards-container'>
        <div className="stats-cards-grid">
          {/* 1. CODES GÉNÉRÉS */}
          <div className="stats-card stats-card-primary">
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
          <div className="stats-card stats-card-secondary">
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
          <div className="stats-card stats-card-accent">
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
