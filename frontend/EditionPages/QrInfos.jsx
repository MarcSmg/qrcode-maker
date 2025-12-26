import React from 'react'
import PDFTypeForm from '../components/FormsTypes/PDFTypeForm'
import URLTypeForm from '../components/FormsTypes/URLTypeForm'

function QrInfos({qrType}) {
  return (
    <div className='edit-main'>
      <h3 style={{
        paddingLeft: '30px',
        fontSize: '20px',
        width: '100%',
        marginBottom:'30px',
        fontWeight:'600',
      }}>2. Remplissez les informations du code QR</h3>
      {qrType == 'pdf' && <PDFTypeForm/>}
      {qrType == 'url' && <URLTypeForm/>}
      {/* {qrType == 'text' && <PDFTypeForm/>}
      {qrType == 'link' && <PDFTypeForm/>}
      {qrType == 'mp3' && <PDFTypeForm/>}
      {qrType == 'mail' && <PDFTypeForm/>} */}
    </div>
  )
}

export default QrInfos
