
function InputConnexion  ({
    id,
    label,
    value,
    onChange, 
    placeholder, 
    type,
    icon: Icon, 
    rightIcon: RightIcon,
    error,
    onRightClick
    
}){

     function handleChange(e) {
    onChange(e);
  }

    return (
    <div className="input-group">
        <label htmlFor={id} className="input-label"> {label} </label>
        <div className={`input-wrapper ${error ? 'error' : ''}`}>
        {Icon && <div className="input-icon left"><Icon size={18} /></div>}

            <input
            id= {id}
            type={type} 
            placeholder= {placeholder} 
            value={value}
            onChange={handleChange}
            style={{ paddingLeft: Icon ? "40px" : undefined, paddingRight: RightIcon ? "40px" : undefined }}
            />
           {RightIcon && <div className="input-icon right" onClick={onRightClick}><RightIcon size={18} /></div>}

        </div>
        
    </div>
    )
}

export default InputConnexion;