# Générateur de QR Code - Backend Laravel

Ce projet est la partie Backend (API) d'une application de génération de QR codes personnalisables. Il est construit avec Laravel 12 et permet de générer des QR codes au format SVG ou PNG pour des textes, des liens, des PDF ou des images.
Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

    PHP 8.2+

    Composer (Gestionnaire de paquets PHP)

    SQLite ou MySQL (via XAMPP sur Arch Linux)

## 🛠️ Installation

Suivez ces étapes pour mettre en place le projet localement après l'avoir cloné :
1. Installation des dépendances
```bash
composer install
```
2. Configuration de l'environnement

Copiez le fichier d'exemple pour créer votre fichier .env :

```bash
cp .env.example .env
```
Générez ensuite la clé de sécurité de l'application :
Bash

php artisan key:generate

3. Activation des drivers PHP (Spécifique à Arch Linux)

Pour que l'application fonctionne, vous devez activer les extensions suivantes dans votre fichier php.ini (souvent situé dans /etc/php/php.ini) :

    Installez les paquets système : sudo pacman -S php-sqlite php-gd

    Décommentez les lignes suivantes dans php.ini :

        extension=pdo_sqlite

        extension=sqlite3

        extension=gd (Essentiel pour le dessin des QR Codes)

4. Base de données et Stockage

Créez la base de données et les tables nécessaires :
Bash

php artisan migrate

Créez le lien symbolique pour permettre l'accès public aux fichiers (PDF/Images) encodés dans les QR Codes :
```bash

php artisan storage:link
```
## 🚀 Lancement

Démarrez le serveur de développement local :
Bash

php artisan serve

L'API sera accessible à l'adresse : http://localhost:8000
📦 Librairies utilisées

    SimpleSoftwareIO/simple-qrcode : Utilisée pour la génération et la personnalisation des QR Codes.