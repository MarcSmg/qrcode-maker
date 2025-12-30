import React, { useState } from "react";
import "../styles/Dashboard.css";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";


export default function Dashboard() {
    console.log(JSON.parse(localStorage.getItem("currentMenu")));

    const [currentMenu, setCurrentMenu] = useState(JSON.parse(localStorage.getItem("currentMenu")) || 0)
    return (
        <div className="dashboard-container">
            <Sidebar setCurrentMenu={setCurrentMenu} />
            <MainContent currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
        </div>
    );
}

