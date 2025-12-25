import { ArrowBigLeft, ArrowLeft, ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import "../styles/Edition.css";


function Edition() {
  const [activeElementId, setActiveElementId] = useState(1)
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
      <h2><ChevronLeft />Generer un code QR</h2>
      <div className='breadcrum'>
        {steps.map((element) => {
          return (
            <div key={element.id} className={`breadcrum-element ${activeElementId == element.id ? 'active-element' : ''}`}>
              <span>{element.id}</span>
              <p>{element.title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Edition
