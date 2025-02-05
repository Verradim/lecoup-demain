
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import FindArtisans from "@/pages/FindArtisans";
import Auth from "@/pages/Auth";
import MyProjects from "@/pages/MyProjects";
import ProjectForm from "@/pages/ProjectForm";
import ProfileManagement from "@/pages/ProfileManagement";
import ProfileForm from "@/pages/ProfileForm";
import ProfileEdit from "@/pages/ProfileEdit";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trouver-des-artisans" element={<FindArtisans />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/projets" element={<MyProjects />} />
          <Route path="/projets/nouveau" element={<ProjectForm />} />
          <Route path="/projets/profil" element={<ProfileManagement />} />
          <Route path="/projets/profil/nouveau" element={<ProfileForm />} />
          <Route path="/projets/profil/modifier" element={<ProfileEdit />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
