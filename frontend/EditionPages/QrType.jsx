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
        marginBottom:'30px',
      }}>1. Selectionnez un type de code QR</h3>
      <div className='qrtypes-container'>
        <OptionCard icon={'Mail'} title={"E mail"} description={"Nigger go back home"}/>
        <OptionCard icon={'Link'} title={"URL"} description={"Nigger go back home"}/>
        <OptionCard icon={'Facebook'} title={"Facebook"} description={"Nigger go back home"}/>
        <OptionCard icon={'Type'} title={"Texte"} description={"Nigger go back home"}/>
        <OptionCard icon={'FileText'} title={"PDF"} description={"Nigger go back home"}/>
        <OptionCard icon={'Music'} title={"Mp3"} description={"Nigger go back home"}/>
      </div>
    </div>
  )
}

export default QrType
