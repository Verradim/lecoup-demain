
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import ContractList from "@/pages/ContractList";
import ContractForm from "@/pages/ContractForm";
import ContractDetails from "@/pages/ContractDetails";
import ContractEdit from "@/pages/ContractEdit";
import { initializeSupabase } from "./supabase-init";
import { useScrollToTop } from "./hooks/useScrollToTop";

// Component to handle scroll restoration for the entire app
function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  useEffect(() => {
    initializeSupabase();
  }, []);

  return (
    <Router>
      <AuthProvider>
        {/* This component will ensure scroll restoration works app-wide */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/mon-espace" element={<AppLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="profil" element={<ProfileManagement />} />
            <Route path="profil/nouveau" element={<ProfileForm />} />
            <Route path="profil/modifier" element={<ProfileEdit />} />
            <Route path="projets/nouveau" element={<ProjectForm />} />
            <Route path="projets" element={<ProjectList />} />
            <Route path="projets/:id" element={<ProjectDetails />} />
            <Route path="projets/:id/modifier" element={<ProjectEdit />} />
            <Route path="sous-traitants" element={<SubcontractorList />} />
            <Route path="sous-traitants/nouveau" element={<SubcontractorFormPage />} />
            <Route path="contrats" element={<ContractList />} />
            <Route path="contrats/nouveau" element={<ContractForm />} />
            <Route path="contrats/:id" element={<ContractDetails />} />
            <Route path="contrats/:id/modifier" element={<ContractEdit />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
