import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import "../styles/Edition.css";
import QrType from '../EditionPages/QrType';
import QrInfos from '../EditionPages/QrInfos';
import QrCustom from '../EditionPages/QrCustom';
import QrDownload from '../EditionPages/QrDownload';
import { useNavigate } from 'react-router-dom';

function Edition() {
  const navigate = useNavigate();

  if (!localStorage.getItem('editionState')) {
    localStorage.setItem('editionState', '1');
  }

  const [activeElementId, setActiveElementId] = useState(
    parseInt(localStorage.getItem('editionState'), 10) || 1
  );

  const [qrType, setQrType] = useState('url');

  const [data, setData] = useState({
    content: "",
    name: "",
    file: null,
    dotsOptions: { type: "square", color: "#000000" },
    backgroundOptions: { color: "#ffffff" },
    imageOptions: { crossOrigin: "anonymous", margin: 10 },
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const setActiveElement = (i) => {
    setActiveElementId(i);
    localStorage.setItem('editionState', i.toString());
  };

  const handleNavigate = (link) => {
    navigate(link);
  };

  // Mapping des types vers type_id
  const getTypeId = () => {
    const map = {
      url: 1,
      website: 1,
      mp3: 1,
      text: 2,
      facebook: 3,
      social: 3,
      email: 4,
      pdf: 5,
    };
    return map[qrType] || 1;
  };

  const createQrCodeOnBackend = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        alert("Vous n'êtes pas connecté");
        return false;
      }

      let response;
      let result;



      if (qrType === 'pdf' && data.file) {
        const formData = new FormData();
        formData.append('name', data.name || data.file.name.replace(/\.pdf$/i, ''));
        formData.append('file', data.file);

        // Optionnels
        if (data.scan_limit) formData.append('scan_limit', data.scan_limit);

        if (data.dotsOptions || data.backgroundOptions) {
          formData.append('design', JSON.stringify({
            color: data.dotsOptions?.color?.replace('#', '') || '000000',
            background: data.backgroundOptions?.color?.replace('#', '') || 'ffffff',
            size: 260,
            margin: 2,
          }));
        }

        response = await fetch('http://localhost:8000/api/qrcodes/pdf', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          body: formData,
        });
      }
      else {
        const payload = {
          type_id: getTypeId(),
          name: data.name || `${qrType.charAt(0).toUpperCase() + qrType.slice(1)} QR`,
          content: data.content.trim() || "https://example.com",
          scan_limit: data.scan_limit || null,
          design: {
            color: data.dotsOptions?.color?.replace('#', '') || '000000',
            background: data.backgroundOptions?.color?.replace('#', '') || 'ffffff',
            size: 260,
            margin: 2,
          },
        };

        response = await fetch('http://localhost:8000/api/qrcodes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erreur backend:', errorData);
        alert(errorData.message || "Erreur lors de la création du QR code");
        return false;
      }

      result = await response.json();

      const shortUrl = result.data?.code_url;

      if (!shortUrl) {
        alert("Le serveur n'a pas retourné de lien court");
        return false;
      }

      setData(prev => ({
        ...prev,
        content: shortUrl
      }));

      console.log("QR créé avec succès ! Lien court :", shortUrl);
      return true;

    } catch (error) {
      console.error("Erreur création QR :", error);
      alert("Impossible de créer le QR code. Vérifiez votre connexion.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (activeElementId === 2) {
      const success = await createQrCodeOnBackend();
      if (!success) return;
    }

    if (activeElementId < 4) {
      setActiveElement(activeElementId + 1);
    }
  };

  const handlePrev = () => {
    if (activeElementId > 1) {
      setActiveElement(activeElementId - 1);
    }
  };

  const steps = [
    { id: 1, title: 'Type de QR' },
    { id: 2, title: 'Infos à convertir' },
    { id: 3, title: 'Style' },
    { id: 4, title: 'Télécharger' },
  ];

  return (
    <div className='edition-main'>
      <h2 style={{ fontWeight: '500' }}>
        <ChevronLeft
          style={{ cursor: 'pointer' }}
          width={30}
          height={30}
          onClick={() => { handleNavigate('/dashboard'); setActiveElement(1); }}
        />
        Générer un code QR
      </h2>

      <div className='breadcrumb'>
        {steps.map((element, index) => (
          <div
            key={element.id}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <div
              className={`breadcrumb-element ${activeElementId === element.id ? 'active-element' : ''}`}
            >
              <span>{element.id}</span>
              <p>{element.title}</p>
            </div>
            {index < steps.length - 1 && <ChevronRight width={30} height={30} />}
          </div>
        ))}
      </div>

      <div className='main-content no-scrollbar'>
        {activeElementId === 1 && <QrType setQrType={setQrType} setActiveElementId={setActiveElement} />}
        {activeElementId === 2 && <QrInfos qrType={qrType} data={data} setData={setData} />}
        {activeElementId === 3 && <QrCustom data={data} setData={setData} />}
        {activeElementId === 4 && <QrDownload data={data} />}
      </div>

      <div className='nav-buttons'>
        <button
          className="btn-primary"
          disabled={activeElementId === 1 || loading}
          style={{ backgroundColor: activeElementId === 1 ? '#7C8493' : '' }}
          onClick={handlePrev}
        >
          Précédent
        </button>

        <button
          className="btn-primary"
          disabled={activeElementId === 4 || loading}
          style={{ backgroundColor: activeElementId === 4 ? '#7C8493' : '' }}
          onClick={handleNext}
        >
          {loading ? 'Création en cours...' : activeElementId === 3 ? 'Créer le QR' : 'Suivant'}
        </button>
      </div>
    </div>
  );
}

export default Edition;