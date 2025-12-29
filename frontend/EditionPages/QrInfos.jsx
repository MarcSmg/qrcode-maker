import React from 'react'
import PDFTypeForm from '../components/FormsTypes/PDFTypeForm'
import URLTypeForm from '../components/FormsTypes/URLTypeForm'
import EmailTypeForm from '../components/FormsTypes/EmailTypeForm'
import TextTypeForm from '../components/FormsTypes/TextTypeForm'
import SocialTypeForm from '../components/FormsTypes/SocialTypeForm'
import Mp3TypeForm from '../components/FormsTypes/Mp3TypeForm'

function QrInfos({ qrType, setData }) {
  return (
    <div className='edit-main'>
      <h3 style={{
        paddingLeft: '30px',
        fontSize: '20px',
        width: '100%',
        marginBottom: '30px',
        fontWeight: '600',
      }}>2. Remplissez les informations du code QR</h3>
      <div>
        {qrType == 'email' && <EmailTypeForm setData={setData} />}
        {qrType == 'url' && <URLTypeForm setData={setData} />}
        {qrType == 'facebook' && <SocialTypeForm setData={setData} />}
        {qrType == 'text' && <TextTypeForm setData={setData} />}
        {qrType == 'pdf' && <PDFTypeForm setData={setData} />}
        {qrType == 'mp3' && <Mp3TypeForm setData={setData} />}
      </div>
    </div>
  )
}

export default QrInfos
