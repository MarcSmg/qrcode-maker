import { Eye, EyeOff, Lock } from 'lucide-react';
import React, { useState } from 'react'

function PasswordInput(
    {
        id,
        name,
        className,
        label,
        comp,
        checkPasswordCompatibility,
        value,
        setPassword,
        handleChange,
    }
) {

    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="form-group">
            <label className="form-label" htmlFor="password">{label}</label>
            <div className="input-wrapper">
                <Lock className='input-icon' />
                <input
                    type={showPassword ? "text" : "password"}
                    id={id}
                    name={name}
                    className={className}
                    placeholder="••••••••"
                    value={value}
                    onChange={(e) => { checkPasswordCompatibility && checkPasswordCompatibility(e, e.target.value, comp); handleChange && handleChange(e); setPassword && setPassword(e.target.value) }}
                    required
                />
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff />

                    ) : (
                        <Eye />
                    )}
                </button>
            </div>
        </div>
    )
}

export default PasswordInput
