import React from 'react'
import {
    LayoutDashboard,
    BookOpen,
    CalendarDays,
    FolderOpen,
    MessageSquare,
    ClipboardList,
    Settings,
    LogOut,
} from "lucide-react";

function Sidebar() {
    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: BookOpen, label: "Lessons" },
        { icon: CalendarDays, label: "Schedule" },
        { icon: FolderOpen, label: "Materials" },
        { icon: MessageSquare, label: "Forum" },
        { icon: ClipboardList, label: "Assessments" },
        { icon: Settings, label: "Settings" },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon"></div>
                <h2>Smart</h2>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <a key={index} href="#" className={`nav-item ${item.active ? "active" : ""}`}>
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
