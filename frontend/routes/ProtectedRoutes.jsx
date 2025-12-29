import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function isTokenValid(token) {
    return typeof token === "string" && token.includes("|") && token.split("|")[1].length > 0;
}

export default function ProtectedRoute() {
    const { token } = useAuth();

    const isAuth = token && isTokenValid(token);

    if (!isAuth) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
}
