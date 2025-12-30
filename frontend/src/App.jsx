import { BrowserRouter } from "react-router-dom";
import '../styles/App.css'
import { AuthProvider } from "../context/AuthContext";
import AppRoutes from "../routes/AppRoutes";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
