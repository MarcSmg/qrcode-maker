import React, { useState } from 'react';
import '../styles/ResetPassword.css';
import LogoAATW from "../public/logo.svg";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // A faire: Appeler API pour changer le mot de passe, partie backend
    console.log('Password reset:', formData);
    setIsSubmitted(true); // Je l'ai mis ici pour tester l'affichage du message de succès
  };

  const passwordsMatch = formData.password && formData.confirmPassword && 
                         formData.password === formData.confirmPassword;

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        {/* COLONNE GAUCHE - BRANDING */}
        <div className="reset-branding-section">
          {/* Logo */}
          <div className="reset-logo-container">
            <div className="reset-brand-logo">
              <img 
                src={LogoAATW}
                alt="AATW Logo" 
                className="reset-brand-logo-image"
              />
              <span className="reset-brand-name">QR It</span>
            </div>
          </div>

          {/* Contenu branding */}
          <div className="reset-branding-content">
            <h1 className="reset-branding-title">
              Créez un nouveau mot de passe sécurisé
            </h1>
            <p className="reset-branding-description">
                Protégez votre compte en choisissant un mot de passe fort et unique.
            </p>
          </div>

          {/* Footer */}
          <div className="reset-branding-footer">
            <div className="reset-language-selector">
              <span>🇬🇧</span>
              <span>English</span>
              <span>▾</span>
            </div>
            <div className="reset-footer-links">
              <a href="#" className="reset-footer-link">Termes</a>
              <a href="#" className="reset-footer-link">Contactez-nous</a>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE - FORMULAIRE */}
        <div className="reset-form-section">
          {!isSubmitted ? (
            <>
              {/* Header avec icône */}
              <div className="reset-form-header">
                <h2 className="reset-form-title">Créez un nouveau mot de passe</h2>
                <p className="reset-form-subtitle">
                  Votre nouveau mot de passe doit être différent des mots de passe précédemment utilisés.
                </p>
              </div>

              {/* Formulaire */}
              <div className="reset-password-form">
                {/* Champ Nouveau mot de passe */}
                <div className="reset-form-group">
                  <label className="reset-form-label" htmlFor="password">Nouveau mot de passe</label>
                  <div className="reset-input-wrapper">
                    <svg className="reset-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="reset-form-input"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="reset-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Indicateur de force */}
                  {formData.password && (
                    <>
                      <div className="reset-password-strength">
                        <div className={`reset-strength-bar ${formData.password.length >= 3 ? 'weak' : ''}`}></div>
                        <div className={`reset-strength-bar ${formData.password.length >= 6 ? 'medium' : ''}`}></div>
                        <div className={`reset-strength-bar ${formData.password.length >= 8 ? 'strong' : ''}`}></div>
                        <div className={`reset-strength-bar ${formData.password.length >= 10 ? 'strong' : ''}`}></div>
                      </div>
                      <div className={`reset-strength-text ${
                        formData.password.length >= 10 ? 'strong' : 
                        formData.password.length >= 8 ? 'medium' : 'weak'
                      }`}>
                        {formData.password.length >= 10 ? '✓ Strong password' : 
                         formData.password.length >= 8 ? 'Medium strength' : 'Weak password'}
                      </div>
                    </>
                  )}

                  {/* Requirements */}
                  <div className="reset-requirements">
                    <div className={`reset-requirement ${formData.password.length >= 8 ? 'met' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>Minimum 8 caractères</span>
                    </div>
                    <div className={`reset-requirement ${/[A-Z]/.test(formData.password) ? 'met' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>Une lettre majuscule</span>
                    </div>
                    <div className={`reset-requirement ${/[0-9]/.test(formData.password) ? 'met' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>Un nombre</span>
                    </div>
                  </div>
                </div>

                {/* Champ Confirmation mot de passe */}
                <div className="reset-form-group">
                  <label className="reset-form-label" htmlFor="confirmPassword">Confirmez votre mot de passe</label>
                  <div className="reset-input-wrapper">
                    <svg className="reset-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`reset-form-input ${
                        formData.confirmPassword ? (passwordsMatch ? 'valid' : 'invalid') : ''
                      }`}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="reset-toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && !passwordsMatch && (
                    <div className="reset-strength-text weak">
                      ✗ Les mots de passe ne correspondent pas
                    </div>
                  )}
                  {passwordsMatch && (
                    <div className="reset-strength-text strong">
                      ✓ Les mots de passe correspondent
                    </div>
                  )}
                </div>

                {/* Bouton Reset */}
                <button 
                  type="button" 
                  className="reset-submit-button" 
                  onClick={handleSubmit}
                  disabled={!passwordsMatch || formData.password.length < 8}
                >
                  Réinitialiser le mot de passe
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </button>
              </div>

              {/* Lien retour connexion */}
              <div className="reset-back-link">
                <a href="#">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Retour à la connexion
                </a>
              </div>
            </>
          ) : (
            <>
              {/* Message de succès */}
              <div className="reset-success-message">
                <div className="reset-success-icon-large">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="reset-success-title">Réinitialisation du mot de passe réussie !</h2>
                <p className="reset-success-text">
                  Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe 
                  et continuer à gérer vos codes QR.
                </p>
                <button className="reset-success-button">
                  Aller à la connexion
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}