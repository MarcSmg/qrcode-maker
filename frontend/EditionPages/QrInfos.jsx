import React from 'react'
import PDFTypeForm from '../components/FormsTypes/PDFTypeForm'

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
    </div>
  )
}

export default QrInfos
