import { EllipsisVertical, Trash, Trash2 } from 'lucide-react'
import React from 'react'

function OptionCard({ icon, title, description }) {

  return (
    <div className='option-card'>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default OptionCard
