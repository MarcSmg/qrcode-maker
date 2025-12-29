import React, { useState } from 'react';
import HistoryCard from "../components/HistoryType/HistoryCard";
import DateGroup from "../components/HistoryType/DateGroup";

function QrGeneratedSection() {
  // données fictives - plus de données pour tester le scroll
  const allCards = [
    { id: 1, type: 'URL', date: new Date(), content: 'https://exemple.com', scans: 12 },
    { id: 2, type: 'Texte', date: new Date(Date.now() - 86400000), content: 'Bonjour monde', scans: 3 },
    { id: 3, type: 'WiFi', date: new Date(Date.now() - 3 * 86400000), content: 'SSID: MonReseau / PSK: 12345678', scans: 0 },
    { id: 4, type: 'Email', date: new Date(Date.now() - 7 * 86400000), content: 'contact@exemple.com', scans: 5 },
    { id: 5, type: 'SMS', date: new Date(Date.now() - 10 * 86400000), content: '+33612345678', scans: 2 },
    { id: 6, type: 'URL', date: new Date(Date.now() - 14 * 86400000), content: 'https://google.com', scans: 8 }
  ];

  const [filterText, setFilterText] = useState('');

  // Filtrer les cartes par contenu
  const filteredCards = allCards.filter(card => 
    card.content.toLowerCase().includes(filterText.toLowerCase()) ||
    card.type.toLowerCase().includes(filterText.toLowerCase())
  );

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

      <DateGroup date={new Date()} />

      <div className="history-list">
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <HistoryCard
              key={card.id}
              type={card.type}
              date={card.date}
              content={card.content}
              scans={card.scans}
            />
          ))
        ) : (
          <p className="no-results">Aucun résultat ne correspond à votre recherche</p>
        )}
      </div>
    </div>
  );
}

export default QrGeneratedSection;