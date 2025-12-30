import React, { useState, useEffect } from 'react';
import WelcomeBanner from './WelcomeBanner';
import Card from './Card';

function Home() {
  const [latestQRCodes, setLatestQRCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8000/api/qrcodes/history', {
          headers: {
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
        });

        if (!response.ok) throw new Error('Failed to load QR codes');

        const result = await response.json();
        const generated = result.generated || [];

        // Take the 8 most recent
        const latest = generated
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 8);

        setLatestQRCodes(latest);
      } catch (err) {
        console.error(err);
        setLatestQRCodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  

  return (
    <div className="home">
      <WelcomeBanner />

      <div className="content-grid no-scrollbar">
        <h2>Mes QR codes</h2>

        {loading ? (
          <p>Chargement de vos QR codes...</p>
        ) : latestQRCodes.length === 0 ? (
          <p>Aucun QR code généré pour le moment</p>
        ) : (
          <>
            <div className="grid-container">
              {latestQRCodes.map(qr => (
                <Card
                  key={qr.id}
                  qrId={qr.id}
                  qrCodeUrl={qr.code_url}
                  isActive={qr.is_active}
                  shortCode={qr.short_code}
                  content={qr.content}
                  scanCount={qr.scan_count}
                  createdAt={qr.created_at}
                />
              ))}
            </div>

            <button className="btn-secondary" onClick={() => window.location.href = '/history'}>
              Tout voir
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;