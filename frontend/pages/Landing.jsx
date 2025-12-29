import React, { useState } from 'react';
import {
    QrCode,
    FileText,
    Image as ImageIcon,
    Wifi,
    Zap,
    BarChart3,
    History,
    CheckCircle2,
    ArrowRight,
    Menu,
    X,
    Twitter,
} from 'lucide-react';
import '../styles/Landing.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('text');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleNavigate = (link) =>{
        navigate(link);
    }

    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <div className="logo-icon">
                            <img style={{ width: "35px", }} src="logo.svg" alt="" />                        </div>
                        <span className="logo-text">QR It</span>
                    </div>

                    <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                        <a href="#">Accueil</a>
                        <a href="#features">Fonctionnalités</a>
                        <a href="#about">A propos</a>
                        <div className="mobile-actions">
                            <a href="/signup" className="login-link">Se connecter</a>
                            <button className="btn-primary" onClick={()=>handleNavigate('/signup')}>Commencer</button>
                        </div>
                    </div>

                    <div className="nav-actions">
                        <a href="/signup" className="login-link">Se connecter</a>
                        <button className="btn-primary" onClick={()=>handleNavigate('/signup')}>Commencer</button>
                    </div>

                    <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Créer une expérience unifiée <br />
                        entre<span className="highlight-blue"> le réel et le virtuel</span>
                    </h1>
                    <p className="hero-subtitle">
                        Créez des codes QR élégants et traçables pour votre entreprise, vos événements ou un usage personnel. Découvrez la simplicité en toute fluidité.
                    </p>

                    <div className="qr-generator-card">
                        <div className="input-group">
                            <div className="link-icon">
                                <Zap size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Entrez votre URL ici..."
                                className="url-input"
                            />
                            <button className="btn-generate" onClick={()=>handleNavigate('/dashboard')}>Générer</button> {/*Might change that in the future */}
                        </div>

                        <div className="generator-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                                onClick={() => setActiveTab('text')}
                            >
                                <FileText size={16} /> Texte
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
                                onClick={() => setActiveTab('pdf')}
                            >
                                <FileText size={16} /> PDF
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
                                onClick={() => setActiveTab('image')}
                            >
                                <ImageIcon size={16} /> Image
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'wifi' ? 'active' : ''}`}
                                onClick={() => setActiveTab('wifi')}
                            >
                                <Twitter size={16} /> Social
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hero-background-glow-1"></div>
                <div className="hero-background-glow-2"></div>
                <div className="hero-background-glow-3"></div>
            </header>

            {/* Features Section */}
            <section className="features" id="features">
                <div className="section-header">
                    <span className="section-tag">FONCTIONNALITES</span>
                    <h2 className="section-title">Tout ce dont vous avez besoin a un seul et meme endroit</h2>
                    <p className="section-desc">Designé pour les professionels exigeants en matière de fiabilité et de raffinement.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon-box blue-soft">
                            <FileText size={24} className="text-blue" />
                        </div>
                        <h3>Formats Polyvalents</h3>
                        <p>Générez instantanément des codes QR pour du texte brut, des documents PDF, des images, des URL, des VCards et plus encore. La flexibilité à portée de main   .</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon-box blue-soft">
                            <BarChart3 size={24} className="text-blue" />
                        </div>
                        <h3>Analyses poussées</h3>
                        <p> Suivez les scans, localisations et types d'appareils en direct pour mieux comprendre votre audience avec des insights détaillés.</p>
                    </div>

                    <div className="feature-card">
                        <div className="icon-box blue-soft">
                            <History size={24} className="text-blue" />
                        </div>
                        <h3>Historique & Gestion des codes</h3>
                        <p>Accédez à l'historique complet de vos codes générés. Modifiez les destinations sans réimprimer le code QR grâce à nos liens dynamiques.</p>
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section className="showcase" id="about">
                <div className="showcase-container">
                    <div className="showcase-content">
                        <h2 className="showcase-title">Créez des codes QR sur mesure</h2>
                        <p className="showcase-desc">
                            Allez au delà du format blanc noir. Personnalisez les couleurs, ajoutez des logos, modifiez les formes et téléchargez en formats vectoriels haute résolution.
                        </p>

                        <ul className="feature-list">
                            <li>
                                <CheckCircle2 size={20} className="check-icon" />
                                Couleurs et styles personnalisés
                            </li>
                            <li>
                                <CheckCircle2 size={20} className="check-icon" />
                                Intégration de Logos
                            </li>
                            <li>
                                <CheckCircle2 size={20} className="check-icon" />
                                Téléchargement SVG & PNG Haute Résolution
                            </li>
                        </ul>

                        <button className="btn-primary large" onClick={() => navigate("/signup")}>Créez votre premier Code QR</button>
                    </div>

                    <div className="showcase-visual">
                        <div className="qr-preview-card">
                            {/* Abstract representation of the custom QR mockup */}
                            <div className="mockup-frame">
                                <div className="qr-art">
                                    <img style={{ width: "260px", }} src="images/qrcode.png" alt="" />
                                </div>
                                <div className="mockup-controls">
                                    <div className="mockup-line"></div>
                                    <div className="mockup-line short"></div>
                                    <div className="mockup-actions">
                                        <span className="mockup-btn">SVG</span>
                                        <span className="mockup-btn">PNG</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo">
                            <div className="logo-icon small">
                                <img style={{ width: "30px", }} src="logo.svg" alt="" />
                            </div>
                            <span style={{ color: "#ffffffa0", }} className="logo-text">QR It</span>
                        </div>
                        <p>Simplifying the connection between print and digital with elegant QR solutions.</p>
                    </div>

                    <div className="footer-links">
                        <div className="link-column">
                            <h4>Produits</h4>
                            <a href="#">QR Generator</a>
                            <a href="#">Dynamic QR</a>
                            <a href="#">Analytics</a>
                            <a href="#">API</a>
                        </div>
                        <div className="link-column">
                            <h4>Resources</h4>
                            <a href="#">Blog</a>
                            <a href="#">Help Center</a>
                            <a href="#">QR Code Scanner</a>
                            <a href="#">Examples</a>
                        </div>
                        <div className="link-column">
                            <h4>Entreprise</h4>
                            <a href="#">About Us</a>
                            <a href="#">Careers</a>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 QR It Inc. All rights reserved.</p>
                    <div className="social-icons">
                        {/* Social placeholders */}
                        <span className="social-icon">Twitter</span>
                        <span className="social-icon">GitHub</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
