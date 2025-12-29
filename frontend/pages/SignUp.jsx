import React, { useEffect, useRef, useState } from 'react';
import '../styles/Signup.css';
import LogoAATW from "../public/logo.svg";
import { UserCircle, Mail, Lock, Eye, EyeOff, ArrowRight, ChevronDown, LoaderCircle } from 'lucide-react'
import InputConnexion from '../components/InputConnexion';
import PasswordInput from '../components/PasswordInput';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const form = useRef(null)
  const errorOut = useRef(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [window2Small, setWindow2Small] = useState(window.innerHeight <= 830)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()


  const handleNavigate = (link) => {
    navigate(link);
  }

  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      console.log(updated);
      return updated;
    });
  };

  const checkPasswordCompatibility = (e, current, comp) => {
    
    const { value } = e.target;
    console.log('current: ', current);
    console.log('comp: ', comp);

    if (current == comp) {
      console.log("match");
      setMatch(true)
      setFormData(prev => {
        const updated = { ...prev, ['password']: value };
        console.log(updated);
        return updated;
      });
    }
    else {
      console.log("no match");
      setMatch(false)
    }
  }

  useEffect(() => {
    let timeout;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setWindow2Small(window.innerHeight <= 1024);
      }, 100);

    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const scrollToBottom = () => {
    const element = form.current;
    element.scrollTo({
      top: element.scrollHeight,
      behavior: "smooth",
    });
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(res.status);
        if (res.status == 422) errorOut.current.innerHTML = "Veuillez correctement remplir les champs!"
        if (res.status == 500) errorOut.current.innerHTML = "Erreur Serveur!"
        throw new Error(data.message || "Erreur lors de l'inscription");

      }

      // Tu peux stocker le token si tu veux
      localStorage.setItem("token", data.token);
      handleNavigate("/dashboard");


      console.log(
        "Compte créé avec succès. Vérifie ton email avant de te connecter."
      );
    } catch (err) {
      console.log("Erreur lors de l'inscription: ", err.message);

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
              Là où les QR codes prennent du sens
            </h1>
            <p className="branding-description">
              Une plateforme pensée pour créer et gérer vos QR codes en toute simplicité.
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
        <div className='form-section' >
          {/* Header */}
          <div className="form-header">
            <h2 className="form-title">Créez votre compte</h2>
            <p className="form-subtitle">Commencez votre aventure avec QR It.</p>
          </div>
          <div className="signup-form no-scrollbar" ref={form}>
            {/* Champ Prenom */}
            <InputConnexion
              type={"text"}
              id={"first_name"}
              name={"first_name"}
              label={"Prenom"}
              icon={"UserCircle"}
              className={"form-input"}
              placeholder={"Hannah"}
              value={formData.first_name}
              onChange={handleChange}
            />

            {/* Champ Nom */}
            <InputConnexion
              type={"text"}
              id={"last_name"}
              name={"last_name"}
              label={"Nom"}
              icon={"UserCircle"}
              className={"form-input"}
              placeholder={"JOHNSON"}
              value={formData.last_name}
              onChange={handleChange}
            />

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
              comp={confirmPassword}
              checkPasswordCompatibility={checkPasswordCompatibility}
              setPassword={setPassword}
              value={password}

            />

            {/* Champ Confirmation mot de passe */}
            <PasswordInput
              id={"passwconfirmPasswordord"}
              name={"confirmPassword"}
              className={"form-input"}
              label={"Confirmation du mot de passe"}
              comp={password}
              checkPasswordCompatibility={checkPasswordCompatibility}
              setPassword={setConfirmPassword}
              value={confirmPassword}

            />
            <span
              style={{
                width: '100%',
                display: `${password == '' && confirmPassword == '' ? 'none' : 'inline'}`,
                color: `${match ? 'green' : 'red'}`
              }}>
              {match ? 'Mot de passes identiques ' : 'Vos mot de passes sont differents'}
            </span>
            <span
              style={{
                width: '100%',
                color: 'red',
              }}
              ref={errorOut}>

            </span>

            {/* Bouton Signup */}
            <button type="button" className="signup-button" onClick={handleSubmit}>
              {!loading ? <>Créer mon compte<ArrowRight /></> : <>Inscription.. <LoaderCircle className='animate-spin' /> </>}
            </button>
            <div className="signin-link">
              Vous avez déjà un compte ? <a href="/signin">Connexion</a>
            </div>
          </div>
          <div style={{
            pointerEvents: 'none',
            width: '100%',
            display: `${window2Small ? 'flex' : 'none'}`,
            alignItems: 'center',
            justifyContent: 'center',
            filter: "drop-shadow(2px 2px 8px rgba(4, 46, 123, 0.15))",
            position: 'absolute',
            bottom: '20px',
            left: '0',
          }}
          >
            <div style={{
              pointerEvents: 'visible',
              cursor: 'pointer',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '100%',
            }}
              onClick={() => scrollToBottom()}
            >
              <ChevronDown color='#004ee0' width={30} height={30} />
            </div>
          </div>
        </div >
      </div >
    </div >
  );
}

//           {/* Divider */}
//           <div className="divider">
//             <div className="divider-line"></div>
//             <span className="divider-text">Ou inscrivez-vous avec</span>
//             <div className="divider-line"></div>
//           </div>

//           {/* Boutons OAuth */}
//           <div className="oauth-buttons">
//             <button className="oauth-button" type="button">
//               <svg width="20" height="20" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//               </svg>
//               Google
//             </button>
//           </div>