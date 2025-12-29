import React from 'react';
import { Copy, Trash2 } from 'lucide-react';

function HistoryCard({ type, date, content, scans = 0 }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert('Contenu copié !');
  };

  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      console.log('Élément supprimé');
    }
  };

  return (
    <div className="history-card">
      <div className="card-header">
        <div className="card-info">
          <span className="qr-type">{type}</span>
          <span className="card-date">
            {new Date(date).toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div className="card-actions">
          <button className="btn-icon" onClick={handleCopy} title="Copier">
            <Copy size={18} />
          </button>
          <button className="btn-icon delete" onClick={handleDelete} title="Supprimer">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="card-content">
        <p className="content-text">{content}</p>
      </div>

      <div className="card-footer">
        <span className="scan-count">{scans} scans</span>
      </div>
    </div>
  );
}

export default HistoryCard;
 