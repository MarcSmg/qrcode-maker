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

  // Initialize edition state if not exists
  if (!localStorage.getItem('editionState')) {
    localStorage.setItem('editionState', '1');
  }

  const [activeElementId, setActiveElementId] = useState(
    parseInt(localStorage.getItem('editionState'), 10) || 1
  );

  const [qrType, setQrType] = useState('url'); // default, will be updated by QrType

  const [data, setData] = useState({
    content: " ",
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

  // NEW: Create QR on backend using native fetch
  const createQrCodeOnBackend = async () => {
    try {
      setLoading(true);

      const payload = {
        type_id: 1,
        name: `${qrType.charAt(0).toUpperCase() + qrType.slice(1)} test`,
        content: data.content.trim() || "https://example.com",
        scan_limit: 5,
        design: {
          color: data.dotsOptions.color.replace('#', ''),
          background: data.backgroundOptions.color.replace('#', ''),
          size: 260,
          margin: 2
        },
        metadata: []
      };

      console.log('Token being sent:', localStorage.getItem('token'));

      const response = await fetch('http://localhost:8000/api/qrcodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result?.data?.code_url) {
        const shortUrl = result.data.code_url;

        // Update the QR content to the dynamic short URL
        setData(prev => ({
          ...prev,
          content: shortUrl
        }));

        console.log("QR créé avec succès ! URL courte :", shortUrl);
        return true;
      } else {
        throw new Error("Aucune code_url retournée par le serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la création du QR :", error);
      alert("Impossible de créer le QR code. Vérifiez votre connexion ou réessayez.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle Next button — special case when going from step 2 to 3
  const handleNext = async () => {
    if (activeElementId === 2) {
      const success = await createQrCodeOnBackend();
      if (!success) return; // Stop navigation if backend failed
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
    { id: 2, title: 'Infos a convertir' },
    { id: 3, title: 'Style' },
    { id: 4, title: 'Telecharger' },
  ];

  return (
    <div className='edition-main'>
      <h2 style={{ fontWeight: '500' }}>
        <ChevronLeft
          style={{ cursor: 'pointer' }}
          width={30}
          height={30}
          onClick={() => handleNavigate('/dashboard')}
        />
        Generer un code QR
      </h2>

      <div className='breadcrumb'>
        {steps.map((element, index) => (
          <div
            key={element.id}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <div
              className={`breadcrumb-element ${activeElementId === element.id ? 'active-element' : ''
                }`}
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
          {loading ? 'Création en cours...' : 'Suivant'}
        </button>
      </div>
    </div>
  );
}

export default Edition;