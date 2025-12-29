import { ArrowBigLeft, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import "../styles/Edition.css";
import QrType from '../EditionPages/QrType';
import QrInfos from '../EditionPages/QrInfos';
import QrCustom from '../EditionPages/QrCustom';
import QrDownload from '../EditionPages/QrDownload';
import { useNavigate } from 'react-router-dom';


function Edition() {
  const navigate = useNavigate();
  const [activeElementId, setActiveElementId] = useState(1)
  const [data, setData] = useState("")
  const handleNavigate = (link) => {
    navigate(link);
  }

  const [qrType, setQrType] = useState('email')


  const steps = [
    {
      id: 1,
      title: 'Type de QR',
    },
    {
      id: 2,
      title: 'Infos a convertir',
    },
    {
      id: 3,
      title: 'Style',
    },
    {
      id: 4,
      title: 'Telecharger',
    },

  ]
  return (
    <div className='edition-main'>
      <h2 style={{ fontWeight: '500', }}><ChevronLeft style={{ cursor: 'pointer' }} width={30} height={30} onClick={() => handleNavigate('/dashboard')} />Generer un code QR</h2>
      <div className='breadcrumb'>
        {steps.map((element) => {
          return (
            <div key={element.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div className={`breadcrumb-element ${activeElementId == element.id ? 'active-element' : ''}`}>
                <span>{element.id}</span>
                <p>{element.title}</p>
              </div>
              {element.id < 4 && <ChevronRight width={'30px'} height={'30px'} />}
            </div>
          )
        })}
      </div>
      <div className='main-content no-scrollbar'>
        {activeElementId == 1 && <QrType setQrType={setQrType} setActiveElementId={setActiveElementId} />}
        {activeElementId == 2 && <QrInfos qrType={qrType} setData={setData}/>}
        {activeElementId == 3 && <QrCustom data={data}/>}
        {activeElementId == 4 && <QrDownload />}
      </div>
      <div className='nav-buttons'>
        <button className="btn-primary" onClick={() => {
          if (activeElementId > 1) {
            setActiveElementId(activeElementId => activeElementId - 1)
          }
        }
        }>Precedent</button>
        <button className="btn-primary" onClick={() => {
          if (activeElementId < 4) {
            setActiveElementId(activeElementId => activeElementId + 1)
          }
        }
        }>Suivant</button>
      </div>
    </div>
  )
}

export default Edition
