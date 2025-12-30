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

1. Cloner et installer les dépendances

```bash
# Clonez le dépôt (remplacez l'URL)
git clone "https://github.com/MarcSmg/qrcode-maker.git"

# Entrez dans le dossier du backend
cd backend

# Installez les bibliothèques PHP via Composer
composer install
```

2. Configurer l'environnement

```bash
# Créez le fichier de configuration local à partir de l'exemple
cp .env.example .env

# Générez la clé de sécurité unique de l'application
php artisan key:generate

# Effectuez les migrations
php artisan migrate --seed

# Pour lancer le serveur
php artisan serve

```

Commandes utiles
```bash
php artisan migrate --seed #Pour appliquer les changements faits aux migrations et seeders
php artisan route:list #Lister toutes les routes
```

## Compte admin (dev)

Un compte admin est automatiquement créé via un seeder.

- Email : admin@qrit.app

- Mot de passe : password

## Authentification

Auth via Laravel Sanctum

Fournir le token dans :
Authorization: Bearer <token>

## Mails (développement)

Le projet utilise Mailhog pour intercepter les emails (reset password pour les mots de passes oubliés).
Mailhog est un outil de developpement qui imite les services de mail comme gmail.
👉 Aucun email réel n’est envoyé.

Assurez vous d'installer Mailhog.

### 🛠 Installation de Mailhog

Mailhog est un outil local.
Chaque membre de l’équipe doit l’installer sur sa machine.

🔹 Linux (le plus simple)
Via le binaire officiel

```bash
wget https://github.com/mailhog/MailHog/releases/latest/download/MailHog_linux_amd64
chmod +x MailHog_linux_amd64
sudo mv MailHog_linux_amd64 /usr/local/bin/mailhog
```

Puis lancer :

```bash
mailhog
```
🔹 macOS

Avec Homebrew :

```bash
brew install mailhog
mailhog
```
🔹 Windows

Télécharger l’exécutable depuis :
https://github.com/mailhog/MailHog/releases

Lancer MailHog_windows_amd64.exe

L’interface sera disponible sur : http://localhost:8025


### Pourquoi Mailhog ?

- éviter d’envoyer des emails réels par erreur

- permettre à toute l’équipe de voir les emails de test

- tester le parcours utilisateur complet (lien de reset, vérification email)

### Comment ça marche

Laravel envoie les emails vers Mailhog au lieu de Gmail.
Mailhog les capture et les affiche dans une interface web.

📍 Interface Mailhog :

```bash
http://localhost:8025
```

C’est là que vous trouverez :

- le lien de vérification d’email

- le lien de reset password

Configuration (.env)

Le projet est configuré pour utiliser Mailhog en local :

```env
# .env
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="admin@qrit.app"
MAIL_FROM_NAME="QrIt"
```

