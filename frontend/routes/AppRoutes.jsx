import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Landing from '../pages/Landing'
import '../styles/App.css'
import Edition from "../pages/Edition";
import History from "../pages/History";
import Stats from "../pages/Stats";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import FAQs from "../pages/FAQs";
import ProtectedRoute from "../routes/ProtectedRoutes";

function isTokenValid(token) {
    return (
        typeof token === "string" &&
        token.includes("|") &&
        token.split("|")[1]?.length > 0
    );
}

export default function AppRoutes() {
    const { token } = useAuth();

    const isAuth = !!token && isTokenValid(token);

    return (
        <Routes>

            {/* non-protected routes */}
            {!isAuth && <Route path="/" element={<Landing />} />} {/* Je l'ai mis temporairement pour pouvoir tester la page Signup. À enlever une fois les tests terminés.*/}
            <Route path="/landing" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} /> {/* Next time bascule juste sur la route http://localhost:5173/signup pour voir ton rendu*/}
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password page route */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/faq" element={<FAQs />} />

            {/* protected routes */}
            <Route element={<ProtectedRoute />}>
                {isAuth && <Route path="/" element={<Dashboard />} />}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/history" element={<History />} />
                <Route path="/edition" element={<Edition />} />
            </Route>

            {/* <Route path="/about" element={<About />} /> pour ajouter des pages use this method, just follow this blueprint */}
        </Routes>
    );
}
