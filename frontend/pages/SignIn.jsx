import React, { useRef, useState } from 'react'
import { Mail, Lock, Eye, ArrowRight, LoaderCircle } from "lucide-react";
import '../styles/SignIn.css'
import '../styles/Signup.css'
import InputConnexion from '../components/InputConnexion';
import PasswordInput from '../components/PasswordInput';
import { Navigate } from 'react-router-dom';

function SignIn() {
  const errorOut = useRef(null)
  const [password, setPassword] = useState('')

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      console.log(updated);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status == 422) errorOut.current.innerHTML = "Veuillez correctement remplir les champs!"
        if (res.status == 500) errorOut.current.innerHTML = "Erreur Serveur!"
        throw new Error(data.message || "Erreur lors de la connexion");
      }
      localStorage.setItem("token", data.token);
      <Navigate to="/dashboard"/>

    } catch (err) {
      console.log("erreur lors de la connexion:", err.message);
    } finally {
      setLoading(false);
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
                src={'/logo.svg'}
                alt="AATW Logo"
                className="brand-logo-image"
              />
              <span className="brand-name">QR It</span>
            </div>
          </div>

          {/* Contenu branding */}
          <div className="branding-content">
            <h1 className="branding-title">
              Une solution moderne pour vos QR codes
            </h1>
            <p className="branding-description">
              Concevez des QR codes&nbsp;
              <strong>sécurisés</strong>,&nbsp;
              <strong>personnalisables</strong> et&nbsp;
              <strong>optimisés pour la performance</strong>.            </p>
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
            <h2 className="form-title">Bon retour!</h2>
            <p className="form-subtitle">Connectez-vous pour continuer.</p>
          </div>
          <div className="signup-form no-scrollbar">

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

            {/* Champ Mot de passe */}
            <PasswordInput
              id={"password"}
              name={"password"}
              className={"form-input"}
              label={"Mot de passe"}
              handleChange={handleChange}
              setPassword={setPassword}
              value={password}

            />

            <div className="options">
              <label className="remember">
                <input type="checkbox" />
                Se souvenir
              </label>
              <a href="/forgot-password">Mot de passe oublié ?</a>
            </div>

            <span
              style={{
                width: '100%',
                color: 'red',
              }}
              ref={errorOut}>

            </span>

            {/* Bouton Signup */}
            <button type="button" className="signup-button" onClick={handleSubmit}>
              {!loading ? <>Se connecter <ArrowRight /></> : <>Connexion... <LoaderCircle className='animate-spin' /> </>}
            </button>
            <div className="signin-link">
              Vous n'avez pas de compte ? <a href="/signup">Créer un compte</a>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
  // return (
  //   <div className="signin-page">

  //     <div className="blob blob-top-left">
  //         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  //           <path fill="#1883FF" d="M32.9,-48.6C39.2,-33.9,38.5,-20.3,33.6,-11.3C28.8,-2.3,19.8,2,16.3,10.6C12.8,19.3,14.6,32.2,8.8,42.2C3,52.1,-10.5,59.1,-18.1,54.3C-25.6,49.5,-27.1,33.1,-37.9,19.5C-48.6,5.8,-68.5,-4.9,-70.3,-15.5C-72.2,-26.2,-56,-36.9,-41.3,-50.1C-26.6,-63.3,-13.3,-79.1,0,-79.1C13.3,-79.1,26.6,-63.3,32.9,-48.6Z" transform="translate(100 100)" />
  //         </svg>
  //     </div>

  //     <div className="signin-container">
  //       <div className="signin-extra">
  //         <h2>NOUS SIMPLIFIONS LES QR CODES</h2>
  //         <p>Créer des QR CODES <strong>puissants</strong>  et <strong>hautement performants</strong>  </p>
  //       </div>
  //       <div className="signin-card">

  //         <h1>Bon retour! </h1>
  //         <p className='subtitle'>Connectez-vous pour continuer </p>

  //         <form className='signin-form' onSubmit={handleSubmit}>

  //           <InputConnexion
  //             id="email"
  //             label="Adresse email"
  //             icon = {Mail}
  //             type="email"
  //             value={email}
  //             onChange={ (e) =>{
  //               setEmail(e.target.value);
  //               setErrors(prev => ({ ...prev, email: '' }));

  //             }}
  //             error={!!errors.email} 
  //             placeholder= "votre@email.com"
  //             required 
  //           />
  //           {errors.email && <p className="input-error">{errors.email}</p>}


  //           <InputConnexion
  //             id="password"
  //             label="Mot de passe"
  //             icon = {Lock}
  //             type="password"
  //             value={password}
  //             onChange={ (e) =>{
  //               setPassword(e.target.value);
  //               setErrors(prev => ({ ...prev, password: '' }));

  //             }}
  //             placeholder= "........"
  //             required
  //             rightIcon = {Eye}
  //           />
  //           {errors.password && <p className="input-error">{errors.password}</p>}



  //           <div className="options">
  //             <label className="remember">
  //               <input type="checkbox" />
  //               Se souvenir
  //             </label>
  //             <a href="#">Mot de passe oublié ?</a>
  //           </div>

  //           <button type="submit" className="submit-btn" >
  //             Se connecter →
  //           </button>

  //         </form>

  //         <p className="signup">
  //           Pas encore de compte ? <a href="#">S'inscrire</a>
  //         </p>
  //       </div>
  //     </div>
  //     <div className="blob blob-bottom-right">
  //       <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  //         <path fill="#99CAFF" d="M22.4,16.2C8.9,36.3,-35.9,41.4,-44.9,23.9C-53.9,6.4,-26.9,-33.8,-4.5,-36.4C17.9,-39,35.9,-3.9,22.4,16.2Z" transform="translate(100 100)" />
  //       </svg>

  //     </div>

  //   </div>

  // )
}

export default SignIn
