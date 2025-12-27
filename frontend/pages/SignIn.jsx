import React, { useState } from 'react'
import {Mail, Lock, Eye} from "lucide-react";
import  '../styles/SignIn.css'
import InputConnexion from '../components/InputConnexion';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({email: '', password: ''});
  
  function handleSubmit(event){
    event.preventDefault();
    const newErrors = { email: '', password: '' };
    
    if (!email || email.trim() === '') newErrors.email = 'Veuillez saisir votre email.';
    if (!password || password.trim() === '') newErrors.password = 'Veuillez saisir votre mot de passe.';
    
    setErrors(newErrors);
    
    if (newErrors.email || newErrors.password) return;
    
    console.log("Tentative de connexion", {email, password});
    // appel a l'api pour la connexion
  }
  return (
    <div className="signin-page">

      <div className="blob blob-top-left">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1883FF" d="M32.9,-48.6C39.2,-33.9,38.5,-20.3,33.6,-11.3C28.8,-2.3,19.8,2,16.3,10.6C12.8,19.3,14.6,32.2,8.8,42.2C3,52.1,-10.5,59.1,-18.1,54.3C-25.6,49.5,-27.1,33.1,-37.9,19.5C-48.6,5.8,-68.5,-4.9,-70.3,-15.5C-72.2,-26.2,-56,-36.9,-41.3,-50.1C-26.6,-63.3,-13.3,-79.1,0,-79.1C13.3,-79.1,26.6,-63.3,32.9,-48.6Z" transform="translate(100 100)" />
          </svg>
      </div>
      
      <div className="signin-container">
        <div className="signin-extra">
          <h2>NOUS SIMPLIFIONS LES QR CODES</h2>
          <p>Créer des QR CODES <strong>puissants</strong>  et <strong>hautement performants</strong>  </p>
        </div>
        <div className="signin-card">

          <h1>Bon retour! </h1>
          <p className='subtitle'>Connectez-vous pour continuer </p>

          <form className='signin-form' onSubmit={handleSubmit}>
            
            <InputConnexion
              id="email"
              label="Adresse email"
              icon = {Mail}
              type="email"
              value={email}
              onChange={ (e) =>{
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: '' }));

              }}
              error={!!errors.email} 
              placeholder= "votre@email.com"
              required 
            />
            {errors.email && <p className="input-error">{errors.email}</p>}


            <InputConnexion
              id="password"
              label="Mot de passe"
              icon = {Lock}
              type="password"
              value={password}
              onChange={ (e) =>{
                setPassword(e.target.value);
                setErrors(prev => ({ ...prev, password: '' }));

              }}
              placeholder= "........"
              required
              rightIcon = {Eye}
            />
            {errors.password && <p className="input-error">{errors.password}</p>}



            <div className="options">
              <label className="remember">
                <input type="checkbox" />
                Se souvenir
              </label>
              <a href="#">Mot de passe oublié ?</a>
            </div>

            <button type="submit" className="submit-btn" >
              Se connecter →
            </button>
            
          </form>

          <p className="signup">
            Pas encore de compte ? <a href="#">S'inscrire</a>
          </p>
        </div>
      </div>
      <div className="blob blob-bottom-right">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#99CAFF" d="M22.4,16.2C8.9,36.3,-35.9,41.4,-44.9,23.9C-53.9,6.4,-26.9,-33.8,-4.5,-36.4C17.9,-39,35.9,-3.9,22.4,16.2Z" transform="translate(100 100)" />
        </svg>

      </div>
      
    </div>
    
  )
}

export default SignIn
