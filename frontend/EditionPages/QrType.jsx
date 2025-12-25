import React from 'react'
import OptionCard from '../components/OptionCard'
import { Menu } from 'lucide-react'

function QrType() {
  return (
    <div className='qrtype'>
      <h3 style={{
        paddingTop: '30px',
        paddingLeft: '30px',
        fontSize: '20px',
        width: '100%',
      }}>1. Selectionnez un type de code QR</h3>
      <div className='qrtypes-container'>
        <OptionCard icon={<Menu/>} title={"E mail"}/>
      </div>
    </div>
  )
}

export default QrType
