import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function isTokenValid(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

export default function ProtectedRoute() {
    const { token } = useAuth();

    const isAuth = token && isTokenValid(token);

    if (!isAuth) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
}
