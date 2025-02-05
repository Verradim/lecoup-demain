import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import ProjectForm from "./ProjectForm";

interface Project {
  id: string;
  name: string;
  detailed_descriptions?: string[];
  work_location?: string;
  start_date?: string;
  end_date?: string;
  quote_file_name?: string;
}

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!data) {
          toast.error("Projet non trouvé");
          navigate("/projets");
          return;
        }

        setProject(data as Project);
      } catch (error: any) {
        toast.error("Erreur lors du chargement du projet : " + error.message);
        navigate("/projets");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, user, navigate]);

  if (loading) {
    return (
      <Layout
        title="Modification du projet - Le Coup de Main"
        description="Modifier un projet existant"
        canonicalUrl={`https://lecoup-demain.com/projets/${id}/edit`}
      >
        <div className="container py-8">
          <div className="text-center">Chargement du projet...</div>
        </div>
      </Layout>
    );
  }

  if (!project) return null;

  return (
    <Layout
      title="Modification du projet - Le Coup de Main"
      description="Modifier un projet existant"
      canonicalUrl={`https://lecoup-demain.com/projets/${id}/edit`}
    >
      <ProjectForm initialData={project} mode="edit" />
    </Layout>
  );
};

export default ProjectEdit;