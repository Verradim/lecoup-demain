
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import FindArtisans from "@/pages/FindArtisans";
import Auth from "@/pages/Auth";
import MyProjects from "@/pages/MyProjects";
import ProfileManagement from "@/pages/ProfileManagement";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trouver-des-artisans" element={<FindArtisans />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/projets" element={<MyProjects />} />
          <Route path="/projets/profil" element={<ProfileManagement />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
