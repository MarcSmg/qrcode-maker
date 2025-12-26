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