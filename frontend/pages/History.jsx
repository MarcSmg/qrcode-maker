import React, { useState } from 'react';
import BtnHistory from '../components/HistoryType/BtnHistory.jsx';
import QrGeneratedSection from './QrGeneratedSection.jsx';
import ScanSection from './ScanSection.jsx';
import '../styles/History.css';

function History() {
  const [activeSection, setActiveSection] = useState('qr'); // "qr" or "scan"

  return (
    <div className="history-page no-scrollbar">
      <div className="entete">
        <h3>Historique</h3>

        <div className="container-boutons">
          <BtnHistory
            text="QR codes générés"
            isActive={activeSection === 'qr'}
            onClick={() => setActiveSection('qr')}
          />
          <BtnHistory
            text="Scans"
            isActive={activeSection === 'scan'}
            onClick={() => setActiveSection('scan')}
          />
        </div>
      </div>

      {/* Conditional rendering */}
      {activeSection === 'qr' ? <QrGeneratedSection /> : <ScanSection />}
    </div>
  );
}

export default History;