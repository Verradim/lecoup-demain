import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, User, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Project {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  user_id: string;
  quote_file_name: string | null;
  work_location: string | null;
  detailed_descriptions: string[] | null;
  start_date: string | null;
  end_date: string | null;
}

const MyProjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

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

  const handleEdit = (projectId: string) => {
    navigate(`/projets/${projectId}/edit`);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectToDelete);

      if (error) throw error;

      setProjects(projects.filter((p) => p.id !== projectToDelete));
      toast.success("Projet supprimé avec succès");
    } catch (error: any) {
      toast.error("Erreur lors de la suppression : " + error.message);
    } finally {
      setProjectToDelete(null);
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
          <h1 className="text-3xl font-bold">Mes chantiers</h1>
          <div className="flex items-center space-x-4">
            <Link to="/projets/profil">
              <Button variant="outline" size="sm" className="text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Mes profils
              </Button>
            </Link>
            <Link to="/projets/nouveau">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Créer un nouveau chantier
              </Button>
            </Link>
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
          <div className="text-center py-8">Chargement des chantiers...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Vous n'avez pas encore créé de chantier... Envie d'essayer ?</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(project.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setProjectToDelete(project.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-600 mb-4">{project.description}</p>
                )}
                {project.work_location && (
                  <p className="text-sm text-gray-500 mb-2">
                    Lieu : {project.work_location}
                  </p>
                )}
                {project.quote_file_name && (
                  <p className="text-sm text-gray-500 mb-2">
                    Devis : {project.quote_file_name}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Créé le {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce projet ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données du projet seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default MyProjects;