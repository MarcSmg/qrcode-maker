import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeBanner() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const textList = [
    "Et si on générait un QR..",
    "Tenté par un QR inattendu ?",
    "Une idée, un QR, et on voit où ça mène.",
    "Juste un QR… ou pas.",
    "Laisse le QR décider.",
  ];

  const randomText = textList[Math.floor(Math.random() * textList.length)];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setUserName('Visiteur');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Impossible de récupérer les infos utilisateur');
        }

        const user = await response.json();

        // On prend le champ 'name' en priorité, sinon on fallback sur email
        let name = user.name || user.email?.split('@')[0] || 'Utilisateur';

        // On ne garde que le prénom si c'est un nom complet
        const firstName = name.trim().split(' ')[0];

        // Première lettre en majuscule
        setUserName(firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase());
      } catch (err) {
        console.error(err);
        setUserName('Utilisateur');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleNavigate = () => {
    navigate('/edition');
  };

  return (
    <div className="welcome-banner">
      <div className="welcome-text">
        <h1>
          {loading ? 'Bonjour !' : `Hello ${userName}!`}
        </h1>
        <p>{randomText}</p>
      </div>

      <div className="welcome-illustration">
        <button className="btn-primary" onClick={handleNavigate}>
          Générer un QR code
        </button>
      </div>
    </div>
  );
}

export default WelcomeBanner;