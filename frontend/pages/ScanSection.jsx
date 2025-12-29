import React, { useState } from 'react';
import HistoryCard from "../components/HistoryType/HistoryCard";
import DateGroup from "../components/HistoryType/DateGroup";

function ScanSection() {
  const allScans = [
    { id: 1, type: 'Scan', date: new Date(), content: 'https://exemple.com', scans: 1 },
    { id: 2, type: 'Scan', date: new Date(Date.now() - 86400000), content: 'https://autre-site.fr', scans: 2 },
    { id: 3, type: 'Scan', date: new Date(Date.now() - 2 * 86400000), content: 'https://google.com', scans: 1 },
    { id: 4, type: 'Scan', date: new Date(Date.now() - 5 * 86400000), content: 'https://github.com', scans: 3 },
    { id: 5, type: 'Scan', date: new Date(Date.now() - 7 * 86400000), content: 'https://reddit.com', scans: 2 }
  ];

  const [filterText, setFilterText] = useState('');

  // Filtrer les scans par contenu ET type
  const filteredScans = allScans.filter(item =>
    item.content.toLowerCase().includes(filterText.toLowerCase()) ||
    item.type.toLowerCase().includes(filterText.toLowerCase())
  );

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

      <DateGroup date={new Date()} />

      <div className="history-list">
        {filteredScans.length > 0 ? (
          filteredScans.map(item => (
            <HistoryCard
              key={item.id}
              type={item.type}
              date={item.date}
              content={item.content}
              scans={item.scans}
            />
          ))
        ) : (
          <p className="no-results">Aucun résultat ne correspond à votre recherche</p>
        )}
      </div>
    </div>
  );
}

export default ScanSection;