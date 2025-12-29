import { Navigate, Outlet } from "react-router-dom";


function isTokenValid(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}
export default function ProtectedRoute() {

    const token = localStorage.getItem("token");

    const isAuth = token && isTokenValid(token);

    if (!isAuth) {
        return <Navigate to="/signin" replace />;
    }


    return <Outlet />;
}