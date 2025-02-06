import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import { AppLayout } from "@/components/layouts/AppLayout";
import UserDashboard from "@/pages/UserDashboard";
import ProfileForm from "@/pages/ProfileForm";
import ProfileEdit from "@/pages/ProfileEdit";
import ProfileManagement from "@/pages/ProfileManagement";
import ProjectForm from "@/pages/ProjectForm";
import ProjectList from "@/pages/ProjectList";
import ProjectEdit from "@/pages/ProjectEdit";
import ProjectDetails from "@/pages/ProjectDetails";
import { SubcontractorList } from "@/components/subcontractor/SubcontractorList";
import SubcontractorFormPage from "@/pages/subcontractor/SubcontractorFormPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/mon-espace" element={<AppLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="profil" element={<ProfileForm />} />
            <Route path="profil/modifier" element={<ProfileEdit />} />
            <Route path="profil/gestion" element={<ProfileManagement />} />
            <Route path="projets/nouveau" element={<ProjectForm />} />
            <Route path="projets" element={<ProjectList />} />
            <Route path="projets/:id" element={<ProjectDetails />} />
            <Route path="projets/:id/modifier" element={<ProjectEdit />} />
            <Route path="sous-traitants" element={<SubcontractorList />} />
            <Route path="sous-traitants/nouveau" element={<SubcontractorFormPage />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;