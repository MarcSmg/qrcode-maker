import { Bell, ChevronDown, Mail, Search } from 'lucide-react';
import React from 'react'

function Topbar({setCurrentMenu}) {
    return (
        <header className="topbar">
            <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Search" />
            </div>

            <div className="topbar-actions">
                <div className="language-selector">
                    <span>ENG</span>
                    <ChevronDown size={14} />
                </div>

                <button className="icon-btn">
                    <Mail size={20} />
                </button>
                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                </button>

                <div className="user-profile" onClick={()=>setCurrentMenu("profile")}>
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Profile" />
                    <span>Grace Stanley</span>
                    <ChevronDown size={14} />
                </div>
            </div>
        </header>
    );
}

export default Topbar
