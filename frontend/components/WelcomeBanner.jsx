import React, { useState } from 'react'
import Button from '../components/Button'
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function WelcomeBanner() {
    const navigate = useNavigate();

    const handleNavigate = (link) => {
        navigate(link);
    }

    const textList = [
        "Et si on generait un QR..",
        "Tenté par un QR inattendu ?",
        "Une idée, un QR, et on voit où ça mène.",
        "Juste un QR… ou pas.",
        "Laisse le QR décider.",
    ]

    const [randomIndex] = useState(() => Math.floor(Math.random() * textList.length), [])


    return (
        <div className="welcome-banner">
            <div className="welcome-text">
                <h1>Hello Grace!</h1>
                <p>{textList[randomIndex]}</p>
            </div>
            <div className="welcome-illustration">
                <button className="btn-primary" onClick={() => handleNavigate('/edition')}>Generer un QR code</button>
            </div>
        </div>
    );
}

export default WelcomeBanner
