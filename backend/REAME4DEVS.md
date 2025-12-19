# 🚀 Générateur de QR Code - Backend Laravel

Ce projet constitue la partie **Backend (API)** d'une application de génération de QR codes hautement personnalisables. Il est développé avec **Laravel 12**.

L'API permet de créer des QR codes dynamiques capables de stocker du texte, des URLs, ou de pointer vers des documents (PDF, images) hébergés sur le serveur.

---

## 📋 Prérequis

Avant de cloner et d'installer, assurez-vous que votre environnement (notamment sur **Arch Linux**) dispose des éléments suivants :

* **PHP 8.2+**
* **Composer** (Gestionnaire de paquets PHP)
* **Pilotes de base de données** (MySQL)
* **Extension GD** (Indispensable pour la génération d'images)

---

## 🛠️ Installation et Configuration

Suivez ces étapes pour mettre en place le projet localement. 

> **Note sur la syntaxe :** Les blocs de code ci-dessous utilisent la syntaxe `bash`. Vous devez copier et exécuter ces commandes dans votre terminal Linux.

### 1. Cloner et installer les dépendances

```bash
# Clonez le dépôt (remplacez l'URL)
git clone "https://github.com/MarcSmg/qrcode-maker.git"

# Entrez dans le dossier du backend
cd backend

# Installez les bibliothèques PHP via Composer
composer install
```
### 2. Configurer l'environnement

```bash
# Créez le fichier de configuration local à partir de l'exemple
cp .env.example .env

# Générez la clé de sécurité unique de l'application
php artisan key:generate
```