import React, { useState } from 'react'
import {
    LayoutDashboard,
    CalendarDays,
    LogOut,
    ChartBar,
    Clock,
} from "lucide-react";

function Sidebar() {
    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: ChartBar, label: "Statistiques" },
        { icon: Clock, label: "Historique" },
    ];

const [activeItemIndex, setActiveItemIndex] = useState(0)

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <img style={{width:"32px",height:"32px",}} src="logo_light.svg" alt="logo"/>
                </div>
                <h2>QR It</h2>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <a key={index} href="#" className={`nav-item ${activeItemIndex ==index ? "active" : ""}`} onClick={()=>setActiveItemIndex(index)}>
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>

            <div className="sidebar-footer">
                <a href="#" className="nav-item logout">
                    <LogOut size={20} />
                    <span>Log Out</span>
                </a>
            </div>
        </div>
    );
}
export default Sidebar
