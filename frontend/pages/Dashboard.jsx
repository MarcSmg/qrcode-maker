import React, { useState } from "react";
import "../styles/Dashboard.css";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";


export default function Dashboard() {
    const [currentMenu, setCurrentMenu] = useState(0)
    return (
        <div className="dashboard-container">
            <Sidebar setCurrentMenu={setCurrentMenu} />
            <MainContent currentMenu={currentMenu} setCurrentMenu={setCurrentMenu}/>
        </div>
    );
}

