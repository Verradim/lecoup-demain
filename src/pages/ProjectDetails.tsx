
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Project, WorkTitle } from "./project-form/types";

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
          .single();

        if (error) throw error;

        // Type cast the work_titles to ensure they match our WorkTitle interface
        const typedProject: Project = {
          ...data,
          work_titles: data.work_titles ? data.work_titles.map((wt: any) => ({
            title: wt.title,
            descriptions: wt.descriptions
          })) : null
        };
        
        setProject(typedProject);
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
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={handleGoBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux projets
          </Button>
          
          {project && (
            <Link to={`/projets/${id}/modifier`}>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Modifier le chantier
              </Button>
            </Link>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">Chargement du projet...</div>
        ) : project ? (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                {project.created_at && (
                  <p>Créé le {new Date(project.created_at).toLocaleDateString()}</p>
                )}
                {project.updated_at && (
                  <p>Dernière modification le {new Date(project.updated_at).toLocaleDateString()}</p>
                )}
              </div>
            </div>

            {project.work_location && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Lieu du chantier</h2>
                <p className="text-gray-700">{project.work_location}</p>
              </div>
            )}

            {project.work_titles && project.work_titles.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Détails des travaux</h2>
                <div className="space-y-4">
                  {project.work_titles.map((workTitle, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-2">{workTitle.title}</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {workTitle.descriptions.map((desc, descIndex) => (
                          <li key={descIndex} className="text-gray-700">{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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
