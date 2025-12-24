import React from "react";
import "../styles/Dashboard.css";
import {
    LayoutDashboard,
    BookOpen,
    CalendarDays,
    FolderOpen,
    MessageSquare,
    ClipboardList,
    Settings,
    LogOut,
    Search,
    Bell,
    Mail,
    ChevronDown,
    Filter,
    Phone,
    MoreVertical
} from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <MainContent />
        </div>
    );
}

function MainContent() {
    return (
        <div className="main-content">
            <Topbar />
            <div className="content-grid">
                <div className="left-column">
                    <WelcomeBanner />
                    <div className="stats-row">
                        <PerformanceChart />
                        <MyVisits />
                    </div>
                    <TeachersSection />
                </div>
                <div className="right-column">
                    <CalendarWidget />
                    <UpcomingEvents />
                </div>
            </div>
        </div>
    );
}

function Topbar() {
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

                <div className="user-profile">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" alt="Profile" />
                    <span>Grace Stanley</span>
                    <ChevronDown size={14} />
                </div>
            </div>
        </header>
    );
}

function WelcomeBanner() {
    return (
        <div className="welcome-banner">
            <div className="welcome-text">
                <h1>Hello Grace!</h1>
                <p>You have 3 new tasks. It is a lot of work for today! So let's start!</p>
                <a href="#" className="review-link">review it</a>
            </div>
            <div className="welcome-illustration">
                {/* Placeholder for 3D illustration */}
                <div className="illustration-placeholder">
                    👩‍💻
                </div>
            </div>
        </div>
    );
}

function PerformanceChart() {
    return (
        <div className="card performance-card">
            <div className="card-header">
                <h3>Performance</h3>
                <button className="month-selector">
                    December <ChevronDown size={12} />
                </button>
            </div>

            <div className="performance-content">
                <div className="best-lessons">
                    <h4>The best lessons:</h4>
                    <div className="score-display">
                        <span className="score">95.4</span>
                        <span className="topic">Introduction<br />to programming</span>
                    </div>
                </div>
                <button className="all-lessons-btn">All lessons</button>
            </div>

            <div className="chart-bars">
                {[85, 64, 84, 45, 43, 74].map((h, i) => (
                    <div key={i} className="bar-group">
                        <span className="bar-value">{h}.{i}</span>
                        <div className="bar" style={{ height: `${h}%` }}></div>
                        <span className="bar-label">Label</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MyVisits() {
    return (
        <div className="card visits-card">
            <div className="card-header">
                <h3>My visit</h3>
                <button className="month-selector">
                    December <ChevronDown size={12} />
                </button>
            </div>

            <div className="donuts-grid">
                <div className="donut-item">
                    <div className="donut-chart blue-92">
                        <span>92%</span>
                    </div>
                    <span className="donut-label">Algorithms<br />structures</span>
                </div>
                <div className="donut-item">
                    <div className="donut-chart blue-83">
                        <span>83%</span>
                    </div>
                    <span className="donut-label">Object<br />program.</span>
                </div>
                <div className="donut-item">
                    <div className="donut-chart blue-78">
                        <span>78%</span>
                    </div>
                    <span className="donut-label">Database<br />program.</span>
                </div>
                <div className="donut-item">
                    <div className="donut-chart blue-97">
                        <span>97%</span>
                    </div>
                    <span className="donut-label">Web<br />develop.</span>
                </div>
            </div>
        </div>
    );
}

function TeachersSection() {
    return (
        <div className="card teachers-card">
            <div className="card-header">
                <h3>Linked Teachers</h3>
                <a href="#" className="see-all">See all</a>
            </div>

            <div className="teachers-list">
                <div className="teacher-item">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Mary" />
                    <div className="teacher-info">
                        <h4>Mary Johnson (mentor)</h4>
                        <span>Science</span>
                    </div>
                    <div className="teacher-actions">
                        <button><Mail size={16} /></button>
                        <button><Phone size={16} /></button>
                    </div>
                </div>

                <div className="teacher-item">
                    <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="James" />
                    <div className="teacher-info">
                        <h4>James Brown</h4>
                        <span>Foreign language (Chinese)</span>
                    </div>
                    <div className="teacher-actions">
                        <button><Mail size={16} /></button>
                        <button><Phone size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CalendarWidget() {
    const events = [
        { time: "10:00", title: "Electronics lesson", duration: "9:45 - 10:30, 21 lesson", active: true },
        { time: "11:00", title: "Electronics lesson", duration: "11:00 - 11:45, 22 lesson" },
        { time: "12:00", title: "Robotics lesson", duration: "12:00 - 12:45, 23 lesson" },
        { time: "13:00", title: "C++ lesson", duration: "13:45 - 14:30, 24 lesson" },
        { time: "14:00" },
        { time: "14:30" },
    ];

    return (
        <div className="card calendar-card">
            <div className="card-header">
                <div>
                    <h3>Calendar</h3>
                    <span className="subtitle">5 events today</span>
                </div>
                <button className="month-selector">
                    Today <ChevronDown size={12} />
                </button>
            </div>

            <div className="timeline">
                {events.map((ev, i) => (
                    <div key={i} className="timeline-item">
                        <span className="time-label">{ev.time}</span>
                        <div className="timeline-content">
                            {ev.title ? (
                                <div className={`event-card ${ev.active ? "active" : ""}`}>
                                    <h4>{ev.title}</h4>
                                    <div className="event-meta">
                                        <span className="clock-icon">🕒</span> {ev.duration}
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-slot"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function UpcomingEvents() {
    return (
        <div className="upcoming-section">
            <div className="card-header">
                <h3>Upcoming events</h3>
                <a href="#" className="see-all">See all</a>
            </div>

            <div className="event-list-item">
                <div className="event-icon robot-bg">
                    🤖
                </div>
                <div className="event-details">
                    <h4>The main event in your life "Robot Fest" will coming soon in...</h4>
                    <span className="event-time">14 December 2023 12:00 pm</span>
                </div>
                <button className="more-btn"><MoreVertical size={16} /></button>
            </div>

            <div className="event-list-item">
                <div className="event-icon minecraft-bg">
                    🧱
                </div>
                <div className="event-details">
                    <h4>Webinar of new tools in Minecraft</h4>
                    <span className="event-time">21 December 2023 11:00 pm</span>
                </div>
                <button className="more-btn"><MoreVertical size={16} /></button>
            </div>
        </div>
    )
}
