import React from 'react'
import OptionCard from '../components/OptionCard'

function QrType({setQrType, setActiveElementId}) {
  const qrTypes = [
    {
      type: 'email',
      icon: 'Mail',
      title: 'E-mail',
      description: 'Nigger go back home',
    },
    {
      type: 'url',
      icon: 'Link',
      title: 'URL',
      description: 'Nigger go back home',
    },
    {
      type: 'facebook',
      icon: 'Facebook',
      title: 'Facebook',
      description: 'Nigger go back home',
    },
    {
      type: 'text',
      icon: 'Type',
      title: 'Texte',
      description: 'Nigger go back home',
    },
    {
      type: 'pdf',
      icon: 'FileText',
      title: 'PDF',
      description: 'Nigger go back home',
    },
    {
      type: 'mp3',
      icon: 'Music',
      title: 'Mp3',
      description: 'Nigger go back home',
    },
  ]
  return (
    <div className='edit-main'>
      <h3 style={{
        paddingLeft: '30px',
        fontSize: '20px',
        width: '100%',
        marginBottom: '30px',
        fontWeight: '600',
      }}>1. Selectionnez un type de code QR</h3>
      <div className='qrtypes-container'>
        {qrTypes.map((element) => {
          return (
            <OptionCard
              key={qrTypes.indexOf(element)}
              icon={element.icon} title={element.title}
              description={element.description} 
              onClick = {()=>{setQrType(element.type); setActiveElementId(2)}}
              />
          )
        })}
      </div>
    </div>
  )
}

export default QrType
