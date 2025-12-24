import React from 'react'
import WelcomeBanner from './WelcomeBanner';
import Topbar from './Topbar';

function MainContent() {
    return (
        <div className="main-content">
            <Topbar />
            <WelcomeBanner />
            <div className="content-grid">
                <div className="left-column">
     
                </div>

            </div>
        </div>
    );
}

export default MainContent
