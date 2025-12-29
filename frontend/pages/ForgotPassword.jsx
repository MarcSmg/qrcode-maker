import React, { useState } from 'react';
import '../styles/ForgotPassword.css';
import '../styles/Signup.css'
import LogoAATW from "../public/logo.svg";
import { ArrowLeft, ArrowRight, CircleCheckBig, X } from 'lucide-react';
import InputConnexion from '../components/InputConnexion';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      console.log(updated);
      return updated;
    });

    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi du mail");
      }

      setIsSubmitted(true);

    } catch (err) {
      setError(err.message);
    }
  };

  return (

    <div className="signup-container">
      <div className="signup-card">

        {/* Gradient glows */}
        <svg className='blob-1' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#c9ceffc4" d="M49,-57.4C62.1,-47.4,70.4,-30.6,69,-15.6C67.5,-0.6,56.3,12.7,46.8,25C37.3,37.3,29.6,48.6,18.3,54.5C7.1,60.3,-7.6,60.7,-20.1,55.9C-32.6,51,-43,40.9,-53.2,28.3C-63.4,15.6,-73.4,0.5,-74.2,-16.1C-74.9,-32.7,-66.3,-50.8,-52.4,-60.7C-38.5,-70.7,-19.2,-72.5,-0.7,-71.7C17.9,-71,35.9,-67.5,49,-57.4Z" transform="translate(100 100)" />
        </svg>

        <svg className='blob-2' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#34a4ff35" d="M57.1,-58.8C71.7,-55.7,79.9,-35.6,76.8,-18.7C73.6,-1.8,59.1,12,48.8,26.8C38.6,41.6,32.6,57.4,20.2,67C7.7,76.7,-11.3,80,-20.7,70.7C-30.1,61.3,-29.9,39.2,-33.3,23.8C-36.7,8.5,-43.7,-0.2,-44,-9.4C-44.4,-18.6,-38.1,-28.3,-29.7,-32.5C-21.2,-36.8,-10.6,-35.6,5.3,-41.9C21.2,-48.2,42.4,-62,57.1,-58.8Z" transform="translate(100 100)" />
        </svg>

        {/* COLONNE GAUCHE - BRANDING */}
        <div className="branding-section">
          {/* Logo */}
          <div className="logo-container">
            <div className="brand-logo">
              <img
                src={LogoAATW}
                alt="AATW Logo"
                className="brand-logo-image"
              />
              <span className="brand-name">QR It</span>
            </div>
          </div>

          {/* Contenu branding */}
          <div className="branding-content">
            <h1 className="branding-title">
              Une récupération sécurisée simplifiée
            </h1>
            <p className="branding-description">
              Réinitialisez facilement votre mot de passe et retrouvez l'accès à votre compte en quelques étapes simples.
            </p>
          </div>

          {/* Footer */}
          <div className="branding-footer">
            <div className="language-selector">
              <span>🇬🇧</span>
              <span>English</span>
              <span>▾</span>
            </div>
            <div className="footer-links">
              <a href="#" className="footer-link">Termes</a>
              <a href="#" className="footer-link">Contactez-nous</a>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE - FORMULAIRE */}
        <div className='form-section'>
          {/* Header */}
          <div className="form-header">
            <h2 className="form-title">Mot de passe oublié ?</h2>
            <p className="form-subtitle">
              Ne vous inquiétez pas, nous vous enverrons des instructions de réinitialisation par e-mail.
            </p>
          </div>
          <div className="forgot-password-form no-scrollbar">
            {/* Champ Email */}

            <InputConnexion
              type={"email"}
              id={"email"}
              name={"email"}
              label={"Adresse mail"}
              icon={"Mail"}
              className={"form-input"}
              placeholder={"name@example.com"}
              value={formData.email}
              onChange={handleChange}
            />

            {/* Bouton Reset */}
            <button
              type="button"
              className="forgot-reset-button"
              onClick={(e) => handleSubmit(e)}
              disabled={!email || isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <CircleCheckBig />
                  Email envoyé
                </>
              ) : (
                <>
                  Envoyer le lien de réinitialisation
                  <ArrowRight />
                </>
              )}
            </button>

            {/* Message de succès (si email envoyé) */}
            {isSubmitted && (
              <div className="forgot-success-message">
                <CircleCheckBig stroke='#1883ff' />
                <div className="forgot-success-content">
                  <div className="forgot-success-title">Vérifiez votre boite mail !</div>
                  <div className="forgot-success-text">
                    Nous avons envoyé des instructions de réinitialisation du mot de passe à <strong>{email}</strong>.
                    Veuillez vérifier votre boîte de réception et votre dossier spam.
                  </div>
                </div>
              </div>
            )}

            {/* Message de succès (si email envoyé) */}
            {(!isSubmitted && error != "") && (
              <div className="forgot-error-message">
                <X stroke='red' />
                <div className="forgot-error-content">
                  <div className="forgot-error-title">E-mail non envoyé !</div>
                  <div className="forgot-error-text">
                    {`Il semble qu'une erreur s'est produite lors de l'envoi du mail: ${error}.`}
                  </div>
                </div>
              </div>
            )}

            {/* Lien retour connexion */}
            < div className="forgot-back-link">
              <a href="/signin">
                <ArrowLeft />
                Retour à la connexion
              </a>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
}