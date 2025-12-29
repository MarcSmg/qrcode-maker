
import * as Icons from "lucide-react";
import '../styles/Signup.css';

function InputConnexion({
    id ="",
    name = "",
    className = "",
    label = "Label",
    value = "",
    onChange,
    placeholder = "This is an input",
    type = "text",
    icon = "Pen",

}) {

    const Icon = icon ? Icons[icon] : null;

    function handleChange(e) {
        onChange(e);
    }

    return (
        <div className="form-group">
            <label className="form-label" htmlFor="name">{label}</label>
            <div className="input-wrapper">
                <Icon className="input-icon" />
                <input
                    type={type}
                    id={id}
                    name={name}
                    className={className}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=>handleChange(e)}
                    required
                />
            </div>
        </div>
    )
}

export default InputConnexion;