import React, { useState, useEffect } from 'react';
import HistoryCard from "../components/HistoryType/HistoryCard";
import DateGroup from "../components/HistoryType/DateGroup";

export default function ScanSection() {
  const [scans, setScans] = useState([]);
  const [qrTypes, setQrTypes] = useState({});
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load QR types for names (URL, Email, etc.)
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

  // Fetch real scan history
  useEffect(() => {
    const fetchScans = async () => {
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

        // Use the "scanned" array directly!
        const scanList = result.scanned || [];

        // Sort by most recent scan first
        const sorted = scanList.sort((a, b) =>
          new Date(b.scanned_at) - new Date(a.scanned_at)
        );

        setScans(sorted);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger l'historique des scans");
        setScans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  // Filter by content or type
  const filteredScans = scans.filter(scan => {
    const typeName = qrTypes[scan.type_id] || 'Inconnu';
    const search = filterText.toLowerCase();

    return (
      scan.content.toLowerCase().includes(search) ||
      typeName.toLowerCase().includes(search)
    );
  });

  // Group by scan date
  const groupByDate = () => {
    const groups = {};
    filteredScans.forEach(scan => {
      const date = new Date(scan.scanned_at);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      let key;
      if (date.toDateString() === today.toDateString()) {
        key = 'Aujourd’hui';
      } else if (date.toDateString() === yesterday.toDateString()) {
        key = 'Hier';
      } else {
        key = date.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(scan);
    });
    return groups;
  };

  const grouped = groupByDate();

  if (loading) {
    return <div className="scan-page">Chargement des scans...</div>;
  }

  if (error) {
    return <div className="scan-page"><p style={{color: 'red'}}>{error}</p></div>;
  }

  if (scans.length === 0) {
    return <div className="scan-page"><p>Aucun scan enregistré pour le moment</p></div>;
  }

  return (
    <div className="scan-page">
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
          {filterText ? "Aucun scan trouvé" : "Aucun scan enregistré pour le moment"}
        </p>
      ) : (
        Object.keys(grouped).map(dateLabel => (
          <DateGroup key={dateLabel} date={dateLabel}>
            <div className="history-list no-scrollbar">
              {grouped[dateLabel].map(scan => (
                <HistoryCard
                  key={scan.id + '-' + scan.scanned_at} // unique key
                  type={qrTypes[scan.type_id] || 'Inconnu'}
                  date={new Date(scan.scanned_at)}
                  content={scan.content}
                  scans={scan.scan_count} // total scans for this QR code
                />
              ))}
            </div>
          </DateGroup>
        ))
      )}
    </div>
  );
}