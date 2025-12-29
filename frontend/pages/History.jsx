import React from 'react'
import { useState  } from 'react'
import HistoryFilter from '../components/HistoryType/HistoryFilter'
import BtnHistory from '../components/HistoryType/BtnHistory.jsx'
import '../styles/History.css'
import QrGeneratedSection from './QrGeneratedSection.jsx'
import ScanSection from './ScanSection.jsx'

function History() {
  const [activeSection, setActiveSection] = useState("qr");
  return (
    <div className='history-page'>
      <div className="entete">
        <h3>Historique</h3>
        <div className='container-boutons'>
          <BtnHistory 
            text = {"Par QR codes générés"} 
            isActive={ activeSection === "qr" }
            onClick={() => setActiveSection("qr")}
          />
          <BtnHistory
             text={"Par scans "} 
             isActive={activeSection === "scan"}
             onClick={ () => setActiveSection("scan")}
             />
        </div>
      </div>
      {activeSection === "qr" && <QrGeneratedSection />}
      {activeSection === "scan" && <ScanSection />}
    </div>
  )
}

export default History
