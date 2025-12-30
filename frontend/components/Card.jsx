import React, { useRef, useState, useEffect } from 'react';
import { EllipsisVertical, Trash2, Copy } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';

function Card({ qrId, qrCodeUrl, content, createdAt }) {
  const cardMenu = useRef(null);
  const qrRef = useRef(null);
  const [isActive, setIsActive] = useState(true);
  const [scanCount, setScanCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  // Fetch real-time stats for this specific QR code
  useEffect(() => {
    const fetchStats = async () => {
      if (!qrId) return;

      try {
        setLoadingStats(true);
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8000/api/qrcodes/stats/${qrId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();

        setScanCount(data.scan_count || 0);
        setIsActive(data.is_active !== false); // true by default if missing
      } catch (err) {
        console.error(`Stats fetch error for QR ${qrId}:`, err);
        setScanCount(0);
        setIsActive(true);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [qrId]);

  // Generate QR code from short URL
  useEffect(() => {
    if (!qrRef.current || !qrCodeUrl) return;

    qrRef.current.innerHTML = ''; // clear previous

    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      data: content,
      dotsOptions: { color: '#000000', type: 'square' },
      backgroundOptions: { color: '#ffffff' },
      qrOptions: { errorCorrectionLevel: 'Q' },
    });

    qrCode.append(qrRef.current);
  }, [qrCodeUrl]);

  const toggleMenu = () => {
    cardMenu.current?.classList.toggle('hidden');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeUrl);
    alert('Lien court copié !');
  };

  const handleToggleActive = async () => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = !isActive;

      const response = await fetch(`http://localhost:8000/api/qrcodes/${qrId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_active: newStatus }),
      });

      if (response.ok) {
        setIsActive(newStatus);
      }
    } catch (err) {
      alert('Erreur lors du changement de statut', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer définitivement ce QR code ?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/qrcodes/${qrId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        // Remove card visually
        const cardElement = qrRef.current.closest('.card');
        if (cardElement) cardElement.style.opacity = '0.5';
        alert('QR code supprimé');
      }
    } catch (err) {
      alert('Erreur lors de la suppression', err);
    }
  };

  return (
    <div className="card">
      <p className="qr-state" style={{ color: isActive ? '#00d400' : '#ef4444' }}>
        {loadingStats ? '...' : isActive ? 'Actif' : 'Inactif'}
      </p>

      <div ref={qrRef} className="qr-container" />

      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
      }} onClick={toggleMenu}>
        <EllipsisVertical size={20} />
      </div>

      <div className="card-menu hidden" ref={cardMenu}>
        <ul style={{listStyleType:'none'}}>
          <li onClick={handleToggleActive}>
            {isActive ? 'Désactiver' : 'Activer'} le QR code
          </li>
          <li onClick={handleCopy}>
            <Copy size={18} /> Copier le lien court
          </li>
          <li onClick={handleDelete} style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trash2 size={18} /> Supprimer
          </li>
        </ul>
      </div>

      <div className="card-footer">
        <span className="scan-count">
          {loadingStats ? '...' : `${scanCount} scan${scanCount !== 1 ? 's' : ''}`}
        </span>
        <span className="created-date">
          {new Date(createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
        </span>
      </div>
    </div>
  );
}

export default Card;