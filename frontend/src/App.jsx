import { BrowserRouter as Router, Routes, Route } from "react-router";
import './App.css'
import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeet from "./pages/VideoMeet";
import HomeComponent from "./pages/home";

function App() {
  return (
  <div className="App">
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<Authentication/>}/>
        <Route path="/home" element={<HomeComponent/>}/>
        <Route path="/:url" element={<VideoMeet/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  </div>
  )
}

export default App
