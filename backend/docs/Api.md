# Documentation de l’API

## Présentation

API backend du projet.

- Framework : Laravel
- Authentification : Laravel Sanctum
- Base URL : `/api`

---

## Authentification

L’API utilise une authentification par **token (Bearer)**.

Après connexion, le token doit être envoyé dans les requêtes protégées : Authorization: Bearer <token>


---

## Format des réponses

### Succès

```json
{
  "ok": true,
  "message": "Action réussie",
  "data": {}
}
```

### Erreur
```json
{
  "ok": false,
  "code": "ERROR_CODE",
  "message": "Description de l’erreur"
}
```

---

# Routes Auth

## Inscription

POST `/api/register`

### Body 

```json
{
  "first_name": "peter",
  "last_name": "parker",
  "email": "peter@example.com",
  "password": "secret123"
}
```

> Réponse **201 (Created)**

```json
{
  "ok": true,
  "message": "Utilisateur enrégistré avec succès",
  "user": {
    "id": 1,
    "first_name": "peter",
    "last_name": "parker",
    "email": "peter@example.com"
  },
  "token": "1|XyZAbC123..."
}
```

## Connexion

POST `/api/login`

### Body

```json
{
  "email": "peter@example.com",
  "password": "password"
}
```
> Réponse **200**

```json
{
  "ok": true,
  "token": "1|eyJ0eXAiOiJKV1QiLCJhbGciOi...",
  "user": {
    "id": 1,
    "first_name": "perter",
    "last_name": "parker",
    "email": "peter@example.com",
    "email_verified_at": "2025-01-10T14:32:00.000000Z"
  }
}
```


## Mot de passe oublié

POST `/api/forgot-password`

### Body

```json
{
  "email": "peter@example.com"
}
```
> Réponse 200 (OK)

```json
{
  "ok": true,
  "code": "RESET_LINK_SENT",
  "message": "If the email exists, a reset link has been sent."
}
```

> Réponse 400 (Bad Request)

```json
{
  "ok": false,
  "code": "RESET_LINK_FAILED",
  "message": "Unable to send reset link."
}
```

## Réinitialisation du mot de passe

POST `/api/reset-password`

L'utilisateur après avoir cliqué sur le lien envoyé dans son mail est redirigé sur la page `http://localhost:5173/reset-password?token=XYZ123&email=peter@example.com` avec reset-password/ une route à implementer en React.

React doit prendre ce token et cet e-mail à l'aide de useSearchParams().
useSearchParams vient de react-router-dom.
Il sert à lire les paramètres ?token=...&email=....

```js
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  return (
    <div>
      <p>Email : {email}</p>
      <p>Token : {token}</p>
    </div>
  );
}
```

### Body

```json
{
  "email": "peter@example.com",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...", // Token issu du lien fourni par /api/forgot-password
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

> Réponse 200 (OK)

```json
{
  "ok": true,
  "code": "PASSWORD_RESET_SUCCESS",
  "message": "Password reset successfully"
}
```

> Réponse 400 (Bad Request)

```json
{
  "ok": false,
  "code": "INVALID_RESET_TOKEN",
  "message": "Invalid or expired token"
}
```

---

# Routes Qr Code

## Création d’un QR Code

POST `/api/qrcodes`

> 🔐 **Authentification requise** (token Bearer de l'utilisateur connecté)

### Body

```json
{
  "type_id": 1,
  "name": "QR de Peter Parker",
  "content": "https://example.com",
  "scan_limit": 100,
  "design": {
    "color": [30, 144, 255], // Tableau rbg
    "background": [30, 144, 255], // Tableau rbg
    "size": 300,
    "margin": 1,
    "style": "square"
  },
  "metadata": {
    "owner": "peter parker"
  }
}
```

### Champs

- type_id (required) : ID du type de QR code (doit exister dans qr_types)

- name (required) : Nom du QR code

- content (required) : Contenu principal du QR code

- scan_limit (optional) : Nombre maximum de scans autorisés

- design (optional) : Configuration visuelle (objet libre)

- metadata (optional) : Données additionnelles selon le type

> Réponse 201 (Created)

```json
{
  "message": "QR code créé avec succès",
  "data": {
    "id": 1,
    "user_id": 1,
    "type_id": 1,
    "name": "QR de Peter Parker",
    "content": "https://example.com",
    "short_code": "AbC123",
    "scan_limit": 100,
    "design": {
      "color": [30, 144, 255], // Tableau rbg
      "background": [30, 144, 255], // Tableau rbg
      "size": 300,
      "margin": 1,
      "style": "square"
    },
    "metadata": {
      "owner": "peter parker"
    },
    "type": {
      "id": 1,
      "name": "url"
    },
    "created_at": "2025-01-01T10:00:00Z",
    "updated_at": "2025-01-01T10:00:00Z"
  }
}
```
> Notes importantes

- Le QR code est automatiquement associé à l’utilisateur authentifié (peter parker ici).

- Le champ content peut être reformatté côté backend selon le type de QR code.

- `short_code` est généré automatiquement et unique.

- `metadata` peut contenir par exemple le username d'un utilisateur dans le cas d'un réseau social (Facebook, etc.)

#  Récupérer un QR Code (par ID)

Permet de récupérer les informations complètes d’un QR code spécifique à partir de son **ID**.


GET `/api/qrcodes/{qrcode}`

> 🔐 **Authentification requise** (token Bearer de l'utilisateur connecté)

## Réponse – Succès (200)

```json
{
  "data": {
    "id": 12,
    "user_id": 1,
    "type_id": 2,
    "name": "Carte de visite Peter Parker",
    "content": "BEGIN:VCARD\nFN:Peter Parker\nEND:VCARD",
    "short_code": "aZ3kP9",
    "scan_limit": 100,
    "design": {
      "color": [0, 0, 0],
      "background": [255, 255, 255],
      "size": 300,
      "margin": 1,
      "style": "square"
    },
    "metadata": {
      "first_name": "Peter",
      "last_name": "Parker"
    },
    "created_at": "2025-12-26T10:15:00.000000Z",
    "updated_at": "2025-12-26T10:15:00.000000Z",
    "type": {
      "id": 2,
      "name": "vcard",
      "description": "Carte de visite"
    }
  }
}
```

## ❌ Erreurs possibles
QR code introuvable (404)
```json
{
  "message": "QR code non trouvé"
}
```

Non autorisé (401) 
Le token n'appartient pas à l'utilisateur ayant le token fourni
```json
{
  "message": "Unauthenticated."
}
```

# 📌 Lister les QR Codes de l’utilisateur

Permet de récupérer la liste de **tous les QR codes appartenant à l’utilisateur authentifié**.

GET `/api/qrcodes/{qrcode}`

Avec filtres :

GET `/api/qrcodes?type_id=2&search=Peter`

## Réponse – Succès (200)

La réponse est paginée, ce qui signifie que tous les codes qr ne seront pas dans la réponse JSON dès le départ. Pour avoir toutes les réponses il faut passer sur chaque page grâce à `data.pagination.current_page`

```json
{
  "data": [
    {
      "id": 12,
      "user_id": 1,
      "type_id": 2,
      "name": "Carte de visite Peter Parker",
      "short_code": "aZ3kP9",
      "scan_limit": 100,
      "scans_count": 1,
      "design": {
        "color": [0, 0, 0],
        "background": [255, 255, 255],
        "size": 300,
        "margin": 1,
        "style": "square"
      },
      "metadata": {
        "first_name": "Peter",
        "last_name": "Parker"
      },
      "is_active": 1,
      "created_at": "2025-12-26T10:15:00.000000Z",
      "updated_at": "2025-12-26T10:15:00.000000Z",
      "type": {
          "id": 1,
          "name": "website",
          "display_name": "Website",
          "description": "Lien vers un site web",
          "created_at": "2025-12-26T13:05:19.000000Z",
          "updated_at": "2025-12-26T13:05:19.000000Z"
      }
    },
    {
      "id": 3,
      "user_id": 1,
      "type_id": 2,
      "name": "QR texte test",
      "content": "Bonjour le monde",
      "short_code": "AdJ8Gka7",
      "scan_limit": null,
      "scan_count": 18,
      "design": null,
      "metadata": [],
      "is_active": 1,
      "created_at": "2025-12-26T13:37:48.000000Z",
      "updated_at": "2025-12-26T15:10:53.000000Z",
      "type": {
          "id": 2,
          "name": "text",
          "display_name": "Text",
          "description": "Texte simple",
          "created_at": "2025-12-26T13:05:19.000000Z",
          "updated_at": "2025-12-26T13:05:19.000000Z"
      }
  }
    ],
  "pagination": {
      "total": 8,
      "per_page": 10,
      "current_page": 1,
      "last_page": 1
  }
}
```

## ❌ Erreurs possibles
Non authentifié (401) 
Absence du token

```json
{
  "message": "Unauthenticated."
}
``
