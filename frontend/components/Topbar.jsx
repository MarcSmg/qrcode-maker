import { Bell, ChevronDown, Mail, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function Topbar({ setCurrentMenu }) {
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    setUserName('Utilisateur');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:8000/api/user', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Impossible de charger le profil');
                }

                const user = await response.json();
                console.log(user);


                // On prend le prénom du champ 'name', ou fallback sur email
                let first_name = user.first_name || user.email?.split('@')[0] || 'Utilisateur';
                let last_name = user.last_name || ' ';
                const firstName = first_name.trim().split(' ')[0];
                const lastName = last_name.trim().split(' ')[0];

                setUserName(firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() + " " + lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase());
            } catch (err) {
                console.error(err);
                setUserName('Utilisateur');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <header className="topbar">
            <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Rechercher..." />
            </div>

            <div className="topbar-actions">
                <div className="language-selector">
                    <span>ENG</span>
                    <ChevronDown size={14} />
                </div>

                <button className="icon-btn" aria-label="Messages">
                    <Mail size={20} />
                </button>

                <button className="icon-btn" aria-label="Notifications">
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                </button>

                <div
                    className="user-profile"
                    onClick={() => {setCurrentMenu(3); localStorage.setItem('currentMenu', 3)}}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src="https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif"
                        alt="Profil utilisateur"
                    />
                    <span>
                        {loading ? '...' : userName}
                    </span>
                    <ChevronDown size={14} />
                </div>
            </div>
        </header>
    );
}

export default Topbar;