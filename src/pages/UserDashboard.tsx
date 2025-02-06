import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { SubcontractorList } from "@/components/subcontractor/SubcontractorList";

interface Project {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  quote_file_name: string | null;
  end_date: string | null;
}

interface Profile {
  company_name: string | null;
  siret: string | null;
  legal_representative_first_name: string | null;
  legal_representative_last_name: string | null;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (projectsError) throw projectsError;
        setProjects(projectsData || []);

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        setProfile(profileData);
      } catch (error: any) {
        toast.error("Erreur lors du chargement des données: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mon espace</h1>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Mon Profil</CardTitle>
            <CardDescription>Informations entreprise</CardDescription>
          </CardHeader>
          <CardContent>
            {profile ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Entreprise</p>
                  <p>{profile.company_name || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">SIRET</p>
                  <p>{profile.siret || "Non renseigné"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Représentant légal</p>
                  <p>
                    {profile.legal_representative_first_name} {profile.legal_representative_last_name}
                  </p>
                </div>
                <Link to="/mon-espace/profil">
                  <Button variant="outline" className="w-full">
                    Gérer mon profil
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <Link to="/mon-espace/profil/nouveau">
                  <Button>Créer mon profil</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Mes derniers chantiers</CardTitle>
            <CardDescription>Aperçu de vos chantiers récents</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Chargement des chantiers...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-4">
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
                    </div>
                    {project.quote_file_name && (
                      <FileText className="w-4 h-4 text-gray-400 ml-4" />
                    )}
                  </div>
                ))}
                {projects.length >= 5 && (
                  <div className="text-center">
                    <Button variant="link">Voir tous les chantiers</Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subcontractors */}
        <Card>
          <CardContent className="pt-6">
            <SubcontractorList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;