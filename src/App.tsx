import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import MyProjects from "@/pages/MyProjects";
import ProjectForm from "@/pages/ProjectForm";
import ProjectEdit from "@/pages/ProjectEdit";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/projets" element={<MyProjects />} />
        <Route path="/projets/nouveau" element={<ProjectForm />} />
        <Route path="/projets/:id/edit" element={<ProjectEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
