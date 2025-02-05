
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Project {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  user_id: string;
}

const MyProjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error: any) {
        toast.error("Error loading projects: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user, navigate]);

  const handleCreateProject = () => {
    toast.info("Create project functionality coming soon!");
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Déconnexion réussie");
      navigate("/");
    } catch (error: any) {
      toast.error("Error signing out: " + error.message);
    }
  };

  if (!user) return null;

  return (
    <Layout
      title="Mes projets - Le Coup de Main"
      description="Gérer mes projets - Le Coup de Main"
      canonicalUrl="https://lecoup-demain.com/projets"
    >
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mes projets</h1>
          <div className="flex items-center space-x-4">
            <Link to="/projets/profil">
              <Button variant="outline" size="sm" className="text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Mes profils
              </Button>
            </Link>
            <Button onClick={handleCreateProject} className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
            <Button 
              onClick={handleSignOut} 
              variant="ghost" 
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Chargement des projets...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Vous n'avez pas encore créer de projets... Envie d'essayer ?</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-600 mb-4">{project.description}</p>
                )}
                <p className="text-sm text-gray-500">
                  Créé le {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyProjects;
