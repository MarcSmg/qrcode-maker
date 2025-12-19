import React from 'react'
import Button from './Button'

function Header() {
    return (
        <>
            <header className='landing-header'>
                <div className='logo-container'>
                    <img src="/logo.svg" alt="logo"/>
                    <h2>QR-IT</h2>
                </div>
                <nav>
                    <ul>
                        <li><a href="">Accueil</a></li>
                        <li><a href="">Fonctionnalités</a></li>
                        <li><a href="">A propos</a></li>
                    </ul>
                </nav>
                <div className='landing-header-buttons-container'>
                    <Button label='Se connecter' variant='ghost' className='header-button' shadow='none' />
                    <Button label='Démarrer' radius='full' className='header-button' shadow='md' />
                </div>
            </header>
        </>
    )
}

export default Header
