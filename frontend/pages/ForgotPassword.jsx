import React, { useState } from 'react';
import '../styles/ForgotPassword.css'; 
import LogoAATW from "../public/logo.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log('Reset password email sent to:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-password-container">

      <div className="forgot-password-card">
        {/* COLONNE GAUCHE - BRANDING */}
        <div className="forgot-branding-section">
          {/* Logo */}
          <div className="forgot-logo-container">
            <div className="forgot-brand-logo">
              <img 
                src={LogoAATW}
                alt="AATW Logo" 
                className="forgot-brand-logo-image"
              />
              <span className="forgot-brand-name">QR It</span>
            </div>
          </div>

          {/* Contenu branding */}
          <div className="forgot-branding-content">
            <h1 className="forgot-branding-title">
              Une récupération sécurisée simplifiée
            </h1>
            <p className="forgot-branding-description">
                Réinitialisez facilement votre mot de passe et retrouvez l'accès à votre compte en quelques étapes simples.
            </p>
          </div>

          {/* Footer */}
          <div className="forgot-branding-footer">
            <div className="forgot-language-selector">
              <span>🇬🇧</span>
              <span>English</span>
              <span>▾</span>
            </div>
            <div className="forgot-footer-links">
              <a href="#" className="forgot-footer-link">Termes</a>
              <a href="#" className="forgot-footer-link">Contactez-nous</a>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE - FORMULAIRE */}
        <div className="forgot-form-section">
          {/* Header avec icône */}
          <div className="forgot-form-header">
            <div className="forgot-icon-container">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
            </div>
            <h2 className="forgot-form-title">Mot de passe oublié ?</h2>
            <p className="forgot-form-subtitle">
              Ne vous inquiétez pas, nous vous enverrons des instructions de réinitialisation par e-mail.
            </p>
          </div>

          {/* Message de succès (si email envoyé) */}
          {isSubmitted && (
            <div className="forgot-success-message">
              <svg className="forgot-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <div className="forgot-success-content">
                <div className="forgot-success-title">Vérifiez votre e-mail !</div>
                <div className="forgot-success-text">
                  Nous avons envoyé des instructions de réinitialisation du mot de passe à <strong>{email}</strong>. 
                  Veuillez vérifier votre boîte de réception et votre dossier spam.
                </div>
              </div>
            </div>
          )}

          {/* Formulaire */}
          <div className="forgot-password-form">
            {/* Champ Email */}
            <div className="forgot-form-group">
              <label className="forgot-form-label" htmlFor="email">Adresse Email</label>
              <div className="forgot-input-wrapper">
                <svg className="forgot-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="forgot-form-input"
                  placeholder="name@compagnie.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Bouton Reset */}
            <button 
              type="button" 
              className="forgot-reset-button" 
              onClick={handleSubmit}
              disabled={!email || isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                    Email envoyé
                </>
              ) : (
                <>
                  Envoyer le lien de réinitialisation
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Lien retour connexion */}
          <div className="forgot-back-link">
            <a href="#">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Retour à la connexion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}