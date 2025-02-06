
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ProjectForm from "./ProjectForm";
import { Project } from "./project-form/types";

const ProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select(`
            *,
            work_titles (
              id,
              title,
              work_descriptions (
                id,
                description
              )
            )
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        setProject(data as Project);
      } catch (error: any) {
        toast.error("Erreur lors du chargement du projet : " + error.message);
        navigate("/mon-espace");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, user, navigate]);

  if (!user) return null;

  if (loading) {
    return (
      <Layout
        title="Chargement... - Le Coup de Main"
        description="Modification d'un chantier - Le Coup de Main"
        canonicalUrl={`https://lecoup-demain.com/mon-espace/projets/${id}/modifier`}
      >
        <div className="container py-8">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout
        title="Projet non trouvé - Le Coup de Main"
        description="Projet non trouvé - Le Coup de Main"
        canonicalUrl={`https://lecoup-demain.com/mon-espace/projets/${id}/modifier`}
      >
        <div className="container py-8">
          <div className="text-center">Ce projet n'existe pas</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`Modifier ${project.name} - Le Coup de Main`}
      description="Modification d'un chantier - Le Coup de Main"
      canonicalUrl={`https://lecoup-demain.com/mon-espace/projets/${id}/modifier`}
    >
      <ProjectForm project={project} mode="edit" />
    </Layout>
  );
};

export default ProjectEdit;
