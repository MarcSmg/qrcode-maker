# 🎯 QR Code Maker - Application Web Multi-Formats

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat&logo=php&logoColor=white)](https://www.php.net)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com)

> Application web moderne de génération et de gestion de codes QR multi-formats avec suivi avancé des scans et personnalisation.

**Institut de Formation et de Recherche en Informatique (IFRI)-UAC**  
**Licence 2 - AATW**  
**Année Académique 2025-2026**

---

## 📋 Table des Matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
  - [Prérequis](#prérequis)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (React)](#frontend-react)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Tests](#-tests)
- [Architecture](#-architecture)
- [Équipe](#-équipe)
- [Licence](#-licence)

---

## 🎯 À propos

QR Code Maker est une application web complète permettant la création, la gestion et le suivi de codes QR personnalisés. Développée avec une architecture moderne React + Laravel, elle offre une expérience utilisateur fluide et des fonctionnalités avancées de personnalisation et d'analytique.

### Contexte

Les codes QR (Quick Response) sont omniprésents dans notre société numérique. Initialement développés en 1994 par Denso Wave pour le suivi automobile, ils sont aujourd'hui utilisés dans le marketing, la logistique, la santé, l'éducation et bien d'autres secteurs.

### Objectifs

- ✅ Génération de codes QR multi-formats (texte, URL, vCard, PDF, images, réseaux sociaux)
- ✅ Système de limitation des scans
- ✅ Historique détaillé avec géolocalisation
- ✅ Personnalisation avancée (couleurs, logos, styles)
- ✅ Architecture REST API moderne et évolutive
- ✅ Sécurité et authentification robustes

---

## ✨ Fonctionnalités

### 🎨 Génération de Codes QR
- Support multi-formats : URL, Texte, vCard, PDF, Images, Réseaux sociaux
- Personnalisation visuelle (couleurs, logos, styles)
- Prévisualisation en temps réel
- Export en plusieurs formats

### 📊 Gestion et Suivi
- Tableau de bord intuitif
- Limitation du nombre de scans par code
- Historique complet des scans
- Statistiques détaillées avec géolocalisation
- Filtrage par période et zone géographique

### 🔐 Sécurité
- Authentification via Laravel Sanctum
- Tokens sécurisés pour les API
- Protection CORS
- Validation des données

---

## 🛠 Technologies

### Frontend
- **React 18** - Interface utilisateur interactive
- **React Router** - Navigation
- **Fetch API** - Requêtes HTTP
- **HTML5 & CSS3** - Structure et style (Grid, Flexbox)
- **qrcode.react** - Génération QR côté client

### Backend
- **Laravel 12** - Framework PHP (MVC)
- **PHP 8.2+** - Langage serveur
- **Laravel Sanctum** - Authentification API
- **SimpleSoftwareIO/simple-qrcode** - Génération QR côté serveur
- **Eloquent ORM** - Gestion de base de données

### Base de Données
- **MySQL 5.7+** - SGBD relationnel

### Outils de Développement
- **Git & GitHub** - Contrôle de version
- **Composer** - Gestionnaire de dépendances PHP
- **npm** - Gestionnaire de paquets JavaScript
- **Mailhog** - Tests d'emails en local
- **cloudflared** - Tunnel sécurisé pour tests mobiles

---

## 🚀 Installation

### Prérequis

Assurez-vous d'avoir installé :
- Node.js et npm
- PHP 8.2+
- Composer
- MySQL 5.7+
- Extension PHP GD
- Git

### Clonage du Dépôt

```bash
git clone https://github.com/MarcSmg/qrcode-maker.git
cd qrcode-maker
```

### Backend (Laravel)

```bash
# Naviguer vers le dossier backend
cd backend

# Installer les dépendances
composer install

# Copier et configurer l'environnement
cp .env.example .env
php artisan key:generate

# Créer la base de données
mysql -u root -p
CREATE DATABASE qrcode_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit

# Configurer .env avec vos paramètres MySQL
# DB_DATABASE=qrcode_db
# DB_USERNAME=root
# DB_PASSWORD=votre_mot_de_passe

# Exécuter les migrations
php artisan migrate --seed

# Démarrer le serveur
php artisan serve
```

Le backend sera accessible sur : **http://localhost:8000**

**Compte admin par défaut :**
- Email : `admin@qrit.app`
- Mot de passe : `password`

### Frontend (React)

```bash
# Naviguer vers le dossier frontend
cd ../frontend

# Installer les dépendances
npm install

# Créer le fichier .env
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env

# Démarrer l'application
npm start
```

Le frontend sera accessible sur : **http://localhost:5173**

---

## ⚙️ Configuration

### Mailhog (Tests d'emails)

**Installation :**

Linux :
```bash
wget https://github.com/mailhog/MailHog/releases/latest/download/MailHog_linux_amd64
chmod +x MailHog_linux_amd64
sudo mv MailHog_linux_amd64 /usr/local/bin/mailhog
mailhog
```

macOS :
```bash
brew install mailhog
mailhog
```

Windows :
```powershell
winget install --id MailHog.MailHog -e
MailHog
```

**Configuration dans `.env` :**
```env
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="admin@qrit.app"
MAIL_FROM_NAME="QrIt"
```

Interface Mailhog : **http://localhost:8025**

### cloudflared (Scans mobiles)

cloudflared expose votre API locale via un tunnel HTTPS sécurisé, permettant les scans depuis des appareils mobiles.

**Installation :**

Linux :
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
```

Windows :
```powershell
winget install --id Cloudflare.cloudflared -e
```

**Lancement :**
```bash
cloudflared tunnel --url http://localhost:8000
```

Copiez l'URL générée (ex: `https://random-words-1234.trycloudflare.com`) et mettez à jour `.env` :
```env
APP_DOMAIN=https://random-words-1234.trycloudflare.com
```

⚠️ **Important :** L'URL change à chaque redémarrage. Gardez cloudflared actif pendant vos tests.

---

## 📖 Utilisation

### Démarrage Rapide

1. Démarrer MySQL
2. Lancer le backend : `php artisan serve`
3. Lancer cloudflared : `cloudflared tunnel --url http://localhost:8000`
4. Lancer le frontend : `npm start`
5. Lancer Mailhog (optionnel) : `mailhog`
6. Accéder à l'application : **http://localhost:5173**

### Commandes Utiles

```bash
# Backend
php artisan route:list              # Lister les routes
php artisan migrate:fresh --seed    # Réinitialiser la BD
php artisan cache:clear             # Nettoyer le cache
php artisan serve --port=8001       # Serveur sur port personnalisé

# Frontend
npm start                           # Démarrer en développement
npm run build                       # Build de production
npm test                            # Exécuter les tests
```

---

## 🧪 Tests

### Tests de Génération de Codes QR

| Test | Description | Statut |
|------|-------------|--------|
| TF-01 | Génération code QR type URL | ✅ Réussi |
| TF-02 | Génération code QR type texte | ✅ Réussi |
| TF-03 | Génération code QR type vCard | ✅ Réussi |
| TF-04 | Personnalisation (couleurs) | ✅ Réussi |
| TF-06 | Limite de scans | ✅ Réussi |

### Tests de Limitation des Scans

| Test | Description | Statut |
|------|-------------|--------|
| TL-01 | Scan sans limite | ✅ Réussi |
| TL-02 | Scan avec limite non atteinte | ✅ Réussi |
| TL-03 | Tentative après limite atteinte | ✅ Réussi |
| TL-04 | Incrémentation compteur | ✅ Réussi |
| TL-05 | Mise à jour limite | ✅ Réussi |

### Tests de Géolocalisation

| Test | Description | Statut |
|------|-------------|--------|
| TG-01 | Enregistrement IP | ✅ Réussi |
| TG-02 | Données géographiques | ✅ Réussi |
| TG-04 | Filtrage par période | ✅ Réussi |
| TG-05 | Filtrage géographique | ✅ Réussi |

### Tests d'Authentification

| Test | Description | Statut |
|------|-------------|--------|
| TA-01 | Inscription utilisateur | ✅ Réussi |
| TA-02 | Connexion valide | ✅ Réussi |
| TA-03 | Génération token Sanctum | ✅ Réussi |
| TA-04 | Validation token | ✅ Réussi |
| TA-05 | Email de vérification | ✅ Réussi |
| TA-06 | Réinitialisation mot de passe | ✅ Réussi |

---

## 🏗 Architecture

### Modèle Client-Serveur REST API

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │  HTTP   │                 │   SQL   │                 │
│  Frontend       │◄───────►│   Backend       │◄───────►│   Base de       │
│  (React)        │  REST   │   (Laravel)     │         │   Données       │
│                 │   API   │                 │         │   (MySQL)       │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### Composants Principaux

**Couche Présentation (Frontend)**
- Interface utilisateur React
- Gestion des interactions
- Communication API via Fetch

**Couche Logique (Backend)**
- Laravel 12 avec pattern MVC
- Génération des codes QR
- Suivi des scans et authentification
- Validation et logique métier

**Couche Données**
- MySQL avec Eloquent ORM
- Stockage persistant
- Historiques et métadonnées

### Classes Principales

- **Utilisateur** : Authentification et profil
- **CodeQR** : Informations du code (contenu, type, personnalisation, limite)
- **Scan** : Métadonnées des scans (timestamp, IP, géolocalisation)
- **QRCodeType** : Types de codes (Text, URL, vCard, PDF, Image, Social Media)
- **ConfigurationStyle** : Paramètres visuels (couleurs, logo, style)

---

## 👥 Équipe

**Groupe 6 - Licence 2 Informatique**

| Nom | Spécialité |
|-----|------------|
| DOSSA Gaby | GL |
| ADJOVI Marthely | GL |
| AFOUDA Omotola | IA |
| GUENDEHOU Larissa | IA |
| BANDA BONI Charbel | IA |
| AKOHOU Héloise | GL |
| AGOSSOU Nethania | IA |
| KAGBAHINTO Jules | IM |
| SAVI Sosthène | IA |
| OUSSOU Férode | IM |
| YAROU Yazid | GL |

**Encadrant :** Dr. Matine OUSMANE

---

## 📚 Ressources

- [Documentation Laravel](https://laravel.com/docs)
- [Documentation React](https://react.dev)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [SimpleSoftwareIO/simple-qrcode](https://github.com/SimpleSoftwareIO/simple-qrcode)
- [QR Code Standard ISO/IEC 18004:2015](https://www.iso.org/standard/62021.html)
- [Mailhog](https://github.com/mailhog/MailHog)
- [cloudflared](https://github.com/cloudflare/cloudflared)

---

## 🐛 Dépannage

### Erreurs Courantes

**Connexion à la base de données échoue**
- Vérifier que MySQL est démarré
- Vérifier les identifiants dans `.env`

**Erreur CORS**
- Vérifier `config/cors.php` dans Laravel
- Installer le package : `composer require fruitcake/laravel-cors`

**Port déjà utilisé**
```bash
# React
PORT=5174 npm start

# Laravel
php artisan serve --port=8001
```

**Extension GD manquante**
```bash
# Ubuntu/Debian
sudo apt-get install php-gd

# macOS
brew install php@8.2

# Windows
# Décommenter dans php.ini : extension=gd
```

**Scans QR ne fonctionnent pas**
- Vérifier que cloudflared est actif
- Mettre à jour `APP_DOMAIN` dans `.env`
- Redémarrer Laravel après modification
- Régénérer les codes QR

---

## 📄 Licence

Ce projet est développé dans le cadre académique à l'IFRI-UAC.

---

## 🙏 Remerciements

Merci à Dr. Matine OUSMANE pour son encadrement et à tous les membres du Groupe 6 pour leur contribution au projet.

---

<div align="center">

**Institut de Formation et de Recherche en Informatique (IFRI-UAC)**  
*Année Académique 2025-2026*

</div>
