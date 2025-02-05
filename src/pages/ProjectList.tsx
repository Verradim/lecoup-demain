
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { Project } from "./project-form/types";

const ProjectList = () => {
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
        console.error("Error fetching projects:", error);
        toast.error("Erreur lors du chargement des projets");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mes Chantiers</h1>
        <Link to="/mon-espace/projets/nouveau">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Créer un nouveau chantier
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">Chargement des projets...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Vous n'avez pas encore créé de chantier</p>
          <Link to="/mon-espace/projets/nouveau">
            <Button>Créer mon premier chantier</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/mon-espace/projets/${project.id}`)}
            >
              <div className="flex-1">
                <h3 className="font-medium">{project.name}</h3>
                {project.description && (
                  <p className="text-sm text-gray-500">{project.description}</p>
                )}
                <div className="text-sm text-gray-500">
                  Créé le {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>
              {project.quote_file_name && (
                <FileText className="w-4 h-4 text-gray-400 ml-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
