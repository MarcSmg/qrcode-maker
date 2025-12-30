import React, { useState } from 'react'
import {
    LayoutDashboard,
    LogOut,
    ChartBar,
    Clock,
} from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Sidebar({ setCurrentMenu }) {
    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: ChartBar, label: "Statistiques" },
        { icon: Clock, label: "Historique" },
    ];
    const navigate = useNavigate();


    const { token, logout } = useAuth();

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (res.ok) {
                logout(); // clears token from context & localStorage
                navigate("/signin");
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const [activeItemIndex, setActiveItemIndex] = useState(0)

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <img style={{ width: "32px", height: "32px", }} src="logo_light.svg" alt="logo" />
                </div>
                <h2 style={{ fontWeight: '600', paddingLeft: '10px' }}>QR It</h2>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <a key={index} href="#" className={`nav-item ${activeItemIndex == index ? "active" : ""}`} onClick={() => { setActiveItemIndex(index); setCurrentMenu(index); localStorage.setItem('currentMenu', index) }}>
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>

            <div className="sidebar-footer">
                <a onClick={handleLogout} className="nav-item logout">
                    <LogOut size={20} />
                    <span>Log Out</span>
                </a>
            </div>
        </div>
    );
}
export default Sidebar
