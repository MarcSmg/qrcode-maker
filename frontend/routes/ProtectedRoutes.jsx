import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute() {
// const isAuth = localStorage.getItem("token");
const isAuth = false;


if (!isAuth) {
return <Navigate to="/signin" replace />;
}


return <Outlet />;
}