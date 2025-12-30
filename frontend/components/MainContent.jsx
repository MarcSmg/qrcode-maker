import React from 'react'
import WelcomeBanner from './WelcomeBanner';
import Topbar from './Topbar';
import Home from './Home';
import Stats from '../pages/Stats';
import History from '../pages/History';
import Profile from '../pages/Profile'


function MainContent({ currentMenu, setCurrentMenu }) {
    return (
        <div className="main-content">
            <Topbar setCurrentMenu={setCurrentMenu} />
            {currentMenu == 3 && <Profile setCurrentMenu={setCurrentMenu} />}
            {currentMenu == 0 && <Home />}
            {currentMenu == 1 && <Stats />}
            {currentMenu == 2 && <History />}
        </div>
    );
}

export default MainContent
