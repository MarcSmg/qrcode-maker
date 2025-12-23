import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from '../pages/Landing'
import '../styles/App.css'
import Edition from "../pages/Edition";
import History from "../pages/History";
import Stats from "../pages/Stats";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import FAQs from "../pages/FAQs";
import ProtectedRoute from "../routes/ProtectedRoutes";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* non-protected routes */}
        <Route path="/" element={<Landing />} /> {/* Je l'ai mis temporairement pour pouvoir tester la page Signup. À enlever une fois les tests terminés.*/}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> {/* Next time bascule juste sur la route http://localhost:5173/signup pour voir ton rendu*/}
        <Route path="/forgot-password" element={<Landing />} />
        <Route path="/faq" element={<FAQs />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/history" element={<History />} />
          <Route path="/edition" element={<Edition />} />
          <Route path="/dash" element={<Dashboard />} />
        </Route>

        {/* <Route path="/about" element={<About />} /> pour ajouter des pages use this method, just follow this blueprint */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
