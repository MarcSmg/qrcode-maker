import React from 'react';
import { Copy, Trash2 } from 'lucide-react';

function HistoryCard({ type, date, content, scans = 0, shortUrl, qrId, onDelete }) {
  // Use shortUrl if available, fallback to content
  const displayText = shortUrl || content;
  const copyText = shortUrl || content;

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    // Better feedback
    alert(`Copié !\n${copyText}`);
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce QR code ?\nCette action est irréversible.')) {
      return;
    }

    if (!qrId) {
      alert('Impossible de supprimer : ID manquant');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8000/api/qrcodes/${qrId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Échec de la suppression');
      }

      // Notify parent to remove from list
      if (onDelete) {
        onDelete(qrId);
      }

      alert('QR code supprimé avec succès !');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Erreur lors de la suppression : ' + err.message);
    }
  };

  // Format date nicely in French
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="history-card">
      <div className="card-header">
        <div className="card-info">
          <span className="qr-type">{type}</span>
          <span className="card-date">{formattedDate}</span>
        </div>
        <div className="card-actions">
          <button className="btn-icon" onClick={handleCopy} title="Copier le lien court">
            <Copy size={18} />
          </button>
          <button className="btn-icon delete" onClick={handleDelete} title="Supprimer">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="card-content">
        <p className="content-text">{displayText}</p>
        {shortUrl && content !== shortUrl && (
          <p className="original-url">Destination : {content}</p>
        )}
      </div>

      <div className="card-footer">
        <span className="scan-count">{scans} scan{scans > 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}

export default HistoryCard;