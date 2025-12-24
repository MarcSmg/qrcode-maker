import React from "react";
import "../styles/Dashboard.css";
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";


export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <MainContent />
        </div>
    );
}

