import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

function Profile({setCurrentMenu}) {
  const [user, setUser] = useState({
    first_name: "Chargement...",
    last_name: "",
    email: "",
    photo: null,
  });
  const [photo, setPhoto] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  // Récupération des données utilisateur depuis /api/user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Vous n'êtes pas connecté");
          return;
        }

        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Impossible de récupérer les informations");
        }

        const data = await response.json();

        const fullUser = {
          first_name: data.first_name || "Utilisateur",
          last_name: data.last_name || "",
          email: data.email || "",
          photo: null, // Pas de photo en base pour l'instant
        };

        setUser(fullUser);

        // Récupérer une éventuelle photo sauvegardée localement
        const savedPhoto = localStorage.getItem(`profile_photo_${data.id}`);
        if (savedPhoto) {
          setPhoto(savedPhoto);
          setUser((prev) => ({ ...prev, photo: savedPhoto }));
        }
      } catch (err) {
        console.error(err);
        setError("Erreur de chargement du profil");
        setUser({
          first_name: "Utilisateur",
          last_name: "",
          email: "email@example.com",
          photo: null,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Gestion du changement de photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const photoDataUrl = reader.result;
        setPhoto(photoDataUrl);

        // Sauvegarde locale liée à l'utilisateur
        const userId = user.id || "current";
        localStorage.setItem(`profile_photo_${userId}`, photoDataUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Veuillez sélectionner une image valide");
    }
  };

  // Simulation changement mot de passe (à connecter plus tard)
  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (!passwords.current) {
      alert("Veuillez entrer votre mot de passe actuel");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    if (passwords.new.length < 6) {
      alert("Le nouveau mot de passe doit faire au moins 6 caractères");
      return;
    }

    alert("Mot de passe modifié avec succès !");
    setPasswords({ current: "", new: "", confirm: "" });
    setShowPasswordForm(false);
  };

  if (loading) {
    return <div className="profile-container">Chargement du profil...</div>;
  }

  if (error) {
    return <div className="profile-container"><p style={{ color: "red" }}>{error}</p></div>;
  }

  const displayName = `${user.first_name} ${user.last_name}`.trim() || user.email;

  return (
    <>
      <style>{`
        .profile-container {
          width: 100%;
          height: 100%;
          margin: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: start;
          overflow-y: scroll;
        }

        .profile-card {
          min-width:500px;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
        }

        .photo-badge {
          position: relative;
          display: inline-block;
          margin-bottom: 20px;
        }

        .photo-profil {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #2563eb;
        }

        .badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: #2563eb;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          font-size: 28px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-info h3 {
          margin: 12px 0 6px;
          font-size: 24px;
          color: #1e293b;
        }

        .user-info p {
          color: #64748b;
          margin: 4px 0;
        }

        .change-password button {
          background: none;
          border: none;
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          font-size: 15px;
        }

        .password-form {
          margin-top: 24px;
          text-align: left;
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
        }

        .password-form label {
          display: block;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .password-form input {
          width: 100%;
          padding: 10px;
          margin-top: 6px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 15px;
        }

        .password-form button {
          width: 100%;
          padding: 12px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        .password-form button:hover {
          background: #1d4ed8;
        }
      `}</style>

      <div className="profile-container no-scrollbar">
        <h2 style={{ fontWeight: '500' }}>
          <ChevronLeft
            style={{ cursor: 'pointer' }}
            width={30}
            height={30}
            onClick={() => { setCurrentMenu(0); localStorage.setItem("currentMenu", 0) }}
          />
          Profil
        </h2>
        <div className="profile-card">
          <div className="photo-badge">
            <img
              src={photo || "https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif"}
              alt="Photo de profil"
              className="photo-profil"
            />
            <button className="badge" onClick={() => fileInputRef.current.click()}>
              +
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
          </div>

          <div className="user-info">
            <h3>{displayName}</h3>
            <p>{user.email}</p>
          </div>

          <div className="change-password">
            <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
              {showPasswordForm ? "Annuler" : "Modifier le mot de passe"}
            </button>

            {showPasswordForm && (
              <form className="password-form" onSubmit={handlePasswordChange}>
                <label>
                  Mot de passe actuel
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Nouveau mot de passe
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Confirmer le nouveau mot de passe
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    required
                  />
                </label>

                <button type="submit">Changer le mot de passe</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;