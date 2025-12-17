#Prérequis

Node.js (version 18 ou plus)
npm ou yarn

#Vérification :

```bash
node -v
npm -v
```

#Installer les dependances:

```bash
npm install
```
#Lancer le serveur de développement

```bash
npm run dev
```

Le projet sera accessible à l’adresse :

--> http://localhost:5173 (autrement, voir l'addresse dans la console)

#Configuration de React Router

##Dans router.jsx

```jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Generator from "../pages/Generator";
import NotFound from "../pages/NotFound";


export const router = createBrowserRouter([
{ path: "/", element: <Home /> },
{ path: "/generate", element: <Generator /> },
{ path: "*", element: <NotFound /> },
]);
```

##Dans main.jsx :
```jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router";


<RouterProvider router={router} />
```