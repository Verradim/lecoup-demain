
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { AppLayout } from "@/components/layouts/AppLayout";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trouver-des-artisans" element={<FindArtisans />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes under mon-espace */}
            <Route path="/mon-espace" element={<AppLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="projets">
                <Route index element={<Navigate to="/mon-espace" replace />} />
                <Route path="nouveau" element={<ProjectForm />} />
                <Route path=":id" element={<ProjectDetails />} />
                <Route path=":id/modifier" element={<ProjectEdit />} />
              </Route>
              <Route path="profil">
                <Route index element={<ProfileManagement />} />
                <Route path="nouveau" element={<ProfileForm />} />
                <Route path="modifier" element={<ProfileEdit />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
