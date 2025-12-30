import React, { useState } from 'react';
import { Filter } from 'lucide-react'; 

function HistoryFilter({ options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="history-filter-container">
      <button 
        className="filter-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={24} />
      </button>

      {/* Liste des options (affichée seulement si isOpen est vrai) */}
      {isOpen && (
        <ul className="filter-dropdown">
          {options && options.map((option, index) => (
            <li 
              key={index} 
              className="filter-option"
              onClick={() => {
                // console.log(`Option sélectionnée : ${option}`);
                setIsOpen(false); 
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryFilter;