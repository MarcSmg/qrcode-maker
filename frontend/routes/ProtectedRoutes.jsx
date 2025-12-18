import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute() {
// const isAuth = localStorage.getItem("token");
const isAuth = true; // Je l'ai mis à true pour faciliter les tests de la page Signup. À remettre à false une fois les tests terminés.


if (!isAuth) {
return <Navigate to="/signin" replace />;
}


return <Outlet />;
}