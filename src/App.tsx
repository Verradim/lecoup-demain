
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "@/pages/Index";
import FindArtisans from "@/pages/FindArtisans";
import Auth from "@/pages/Auth";
import UserDashboard from "@/pages/UserDashboard";
import ProjectForm from "@/pages/ProjectForm";
import ProjectDetails from "@/pages/ProjectDetails";
import ProjectEdit from "@/pages/ProjectEdit";
import ProfileManagement from "@/pages/ProfileManagement";
import ProfileForm from "@/pages/ProfileForm";
import ProfileEdit from "@/pages/ProfileEdit";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trouver-des-artisans" element={<FindArtisans />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/mon-espace" element={<UserDashboard />} />
            <Route path="/mon-espace/projets/nouveau" element={<ProjectForm />} />
            <Route path="/mon-espace/projets/:id" element={<ProjectDetails />} />
            <Route path="/mon-espace/projets/:id/modifier" element={<ProjectEdit />} />
            <Route path="/mon-espace/profil" element={<ProfileManagement />} />
            <Route path="/mon-espace/profil/nouveau" element={<ProfileForm />} />
            <Route path="/mon-espace/profil/modifier" element={<ProfileEdit />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;

