import React from 'react'
import WelcomeBanner from './WelcomeBanner';
import Topbar from './Topbar';
import Home from './Home';
import Stats from '../pages/Stats';
import History from '../pages/History';


function MainContent({ currentMenu }) {
    return (
        <div className="main-content">
            <Topbar />
            {currentMenu == 0 && <Home />}
            {currentMenu == 1 && <Stats />}
            {currentMenu == 2 && <History />}
        </div>
    );
}

export default MainContent
