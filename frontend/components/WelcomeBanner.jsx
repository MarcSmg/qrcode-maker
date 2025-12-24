import React, {useState } from 'react'

function WelcomeBanner() {
    const textList = [
        "Et si on generait un QR0..",
        "Et si on generait un QR1..",
        "Et si on generait un QR2..",
        "Et si on generait un QR3..",
        "Et si on generait un QR4..",
    ]

    const [randomIndex] = useState(()=>Math.floor(Math.random() * textList.length), [])

    
    return (
        <div className="welcome-banner">
            <div className="welcome-text">
                <h1>Hello Grace!</h1>
                <p>{textList[randomIndex]}</p>
            </div>
            <div className="welcome-illustration">
                {/* Placeholder for 3D illustration */}
                <div className="illustration-placeholder">
                    👩‍💻
                </div>
            </div>
        </div>
    );
}

export default WelcomeBanner
