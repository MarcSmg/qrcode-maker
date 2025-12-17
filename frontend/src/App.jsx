import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from '../pages/Landing'
import '../styles/App.css'

function App() {

  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        {/* <Route path="/about" element={<About />} /> pour ajouter des pages use this method, just follow this blueprint */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
