import { EllipsisVertical, Trash, Trash2 } from 'lucide-react'
import React, { useRef, useState } from 'react'

function Card({ qrState }) {
  const cardMenu = useRef(null)
  const [qrActive, setQrActive] = useState(qrState);
  const toggleHide = () => {
    cardMenu.current.classList.toggle('hidden');
  }

  return (
    <div className='card'>
      <p className='qr-state' style={{ color: qrActive ? '#00d400' : '', }}>{qrActive ? "Actif" : "Inactif"}</p> {/* replace with state */}
      <img src="./images/qrcode.png" alt="qr-code" style={{ width: '80%', height: '80%', }} /> {/* replace with current qr code image */}
      <div
        onClick={() => toggleHide()}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end', }}>
        <EllipsisVertical />
      </div>
      <div className="card-menu hidden" ref={cardMenu}>
        <ul style={{ listStyleType: 'none', }}>
          <li onClick={() => setQrActive(!qrActive)}>{qrActive ? "Desactiver code QR" : "Activer code QR"}</li>
          <li style={{
            color: 'red',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}><Trash2 width={20} />Supprimer QR</li>
        </ul>
      </div>
    </div>
  )
}

export default Card
