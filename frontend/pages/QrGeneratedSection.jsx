import React, { useState, useEffect } from 'react';
import HistoryCard from "../components/HistoryType/HistoryCard";
import DateGroup from "../components/HistoryType/DateGroup";

export default function QrGeneratedSection() {
  const [qrCodes, setQrCodes] = useState([]);
  const [qrTypes, setQrTypes] = useState({});
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load QR types
  useEffect(() => {
    fetch('http://localhost:8000/api/qr-types')
      .then(res => res.json())
      .then(result => {
        const map = {};
        result.data.forEach(type => {
          map[type.id] = type.name;
        });
        setQrTypes(map);
      })
      .catch(err => console.error("Failed to load QR types:", err));
  }, []);

  // Fetch generated QR codes
  useEffect(() => {
    const fetchGenerated = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8000/api/qrcodes/history', {
          headers: {
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
        });

        if (!response.ok) throw new Error('Failed to load history');

        const result = await response.json();

        // Use the "generated" array
        const generatedList = result.generated || [];

        // Sort newest first
        const sorted = generatedList.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );

        setQrCodes(sorted);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les QR codes générés");
        setQrCodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenerated();
  }, []);

  // Filter by content or type
  const filteredCodes = qrCodes.filter(qr => {
    const typeName = qrTypes[qr.type_id] || 'Inconnu';
    const search = filterText.toLowerCase();

    return (
      qr.content.toLowerCase().includes(search) ||
      typeName.toLowerCase().includes(search)
    );
  });

  // Group by creation date
  const groupByDate = () => {
    const groups = {};
    filteredCodes.forEach(qr => {
      const date = new Date(qr.created_at);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      let key;
      if (date.toDateString() === today.toDateString()) key = 'Aujourd’hui';
      else if (date.toDateString() === yesterday.toDateString()) key = 'Hier';
      else key = date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      if (!groups[key]) groups[key] = [];
      groups[key].push(qr);
    });
    return groups;
  };

  const grouped = groupByDate();

  if (loading) {
    return <div className="qr-generated-page">Chargement des QR codes...</div>;
  }

  if (error) {
    return <div className="qr-generated-page"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (qrCodes.length === 0) {
    return <div className="qr-generated-page"><p>Aucun QR code généré pour le moment</p></div>;
  }

  return (
    <div className="qr-generated-page">
      <div className="filter-titre">
        <input
          type="text"
          placeholder="Rechercher par contenu ou type"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="filter-input"
        />
      </div>

      {Object.keys(grouped).length === 0 ? (
        <p className="no-results">
          {filterText ? "Aucun QR code trouvé" : "Aucun QR code généré pour le moment"}
        </p>
      ) : (
        Object.keys(grouped).map(dateLabel => (
          <DateGroup key={dateLabel} date={dateLabel}>
            <div className="history-list no-scrollbar">
              {grouped[dateLabel].map(qr => (
                <HistoryCard
                  key={qr.id}
                  type={qrTypes[qr.type_id] || 'Inconnu'}
                  date={new Date(qr.created_at)}
                  content={qr.content}
                  scans={qr.scan_count}
                  shortUrl={qr.code_url} // optional: for future edit/share
                />
              ))}
            </div>
          </DateGroup>
        ))
      )}
    </div>
  );
}