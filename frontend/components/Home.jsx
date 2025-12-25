import React from 'react'
import WelcomeBanner from './WelcomeBanner'
import Card from './Card'

function Home() {
    return (
        <div className='home'>
            <WelcomeBanner/>
            <div className="content-grid">
                <h2>Mes QR codes</h2>
                <div className="grid-container">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <button className="btn-secondary"> Tout voir</button>
            </div>
        </div>
    )
}

export default Home
