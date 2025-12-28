import React from 'react'
import OptionCard from '../components/OptionCard'

function QrType({ setQrType, setActiveElementId }) {
  const qrTypes = [
    {
      type: 'email',
      icon: 'Mail',
      title: 'E-mail',
      description: 'Ouvre un email pré-rempli au scan.',
    },
    {
      type: 'url',
      icon: 'Link',
      title: 'URL',
      description: 'Un scan pour ouvrir instantanément un site web.',
    },
    {
      type: 'facebook',
      icon: 'Facebook',
      title: 'Facebook',
      description: 'Dirigez vers une page, un profil ou un événement Facebook.',
    },
    {
      type: 'text',
      icon: 'Type',
      title: 'Texte',
      description: 'Affiche un texte ou un message directement au scan.',
    },
    {
      type: 'pdf',
      icon: 'FileText',
      title: 'PDF',
      description: 'Ouvre ou télécharge un document PDF en un scan.',
    },
    {
      type: 'mp3',
      icon: 'Music',
      title: 'MP3',
      description: 'Lance la lecture ou le téléchargement d’un audio.',
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
              onClick={() => { setQrType(element.type); setActiveElementId(2) }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default QrType
