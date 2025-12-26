import { EllipsisVertical, Trash, Trash2 } from 'lucide-react'
import React from 'react'
import * as Icons from "lucide-react";


function OptionCard({ icon, title, description }) {

  const IconComponent = icon ? Icons[icon] : null;


  return (
    <div className='option-card'>
      <div style={{
        padding:'10px',
        backgroundColor:'#2564ed2b',
        borderRadius:'100%',
      }}>
        <IconComponent width={35} height={35} color={'#2564edab'}/>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default OptionCard
