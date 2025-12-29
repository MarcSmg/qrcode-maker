import React from 'react';

function DateGroup({ date }) {
  // Fonction pour formater la date
  const formatDate = (dateObj) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    const inputDate = new Date(dateObj);
    inputDate.setHours(0, 0, 0, 0);

    // Comparaisons
    if (inputDate.getTime() === today.getTime()) {
      return "Aujourd'hui";
    } else if (inputDate.getTime() === yesterday.getTime()) {
      return "Hier";
    } else {
      // Format personnalisé : "12 Juin 2025"
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return inputDate.toLocaleDateString('fr-FR', options);
    }
  };

  return (
    <div className="date-group">
      <h4 className="date-label">{formatDate(date)}</h4>
    </div>
  );
}

export default DateGroup;
