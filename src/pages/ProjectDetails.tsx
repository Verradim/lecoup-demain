
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Project {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  user_id: string;
  quote_file_name: string | null;
  quote_file_path: string | null;
  work_location: string | null;
  detailed_descriptions: string[] | null;
  start_date: string | null;
  end_date: string | null;
}

const ProjectDetails = () => {
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
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          toast.error("Ce projet n'existe pas");
          navigate("/projets");
          return;
        }
        
        setProject(data);
      } catch (error: any) {
        console.error("Error fetching project:", error);
        toast.error("Erreur lors du chargement du projet");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, user, navigate]);

  const handleGoBack = () => {
    navigate("/projets");
  };

  if (!user) return null;

  return (
    <Layout
      title={`${project?.name || 'Chargement...'} - Le Coup de Main`}
      description="Détails du projet - Le Coup de Main"
      canonicalUrl={`https://lecoup-demain.com/projets/${id}`}
    >
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux projets
        </Button>

        {loading ? (
          <div className="text-center py-8">Chargement du projet...</div>
        ) : project ? (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <p className="text-gray-600">
                Créé le {new Date(project.created_at).toLocaleDateString()}
              </p>
            </div>

            {project.description && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{project.description}</p>
              </div>
            )}

            {project.work_location && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Lieu du chantier</h2>
                <p className="text-gray-700">{project.work_location}</p>
              </div>
            )}

            {project.detailed_descriptions && project.detailed_descriptions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Détails des travaux</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {project.detailed_descriptions.map((desc, index) => (
                    <li key={index} className="text-gray-700">{desc}</li>
                  ))}
                </ul>
              </div>
            )}

            {(project.start_date || project.end_date) && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Dates du chantier</h2>
                <div className="text-gray-700">
                  {project.start_date && (
                    <p>Début : {new Date(project.start_date).toLocaleDateString()}</p>
                  )}
                  {project.end_date && (
                    <p>Fin : {new Date(project.end_date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            )}

            {project.quote_file_name && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Document attaché</h2>
                <p className="text-gray-700">Devis : {project.quote_file_name}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Ce projet n'existe pas</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetails;
