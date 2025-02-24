
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

interface Profile {
  company_name: string | null;
  siret: string | null;
  legal_representative_first_name: string | null;
  legal_representative_last_name: string | null;
}

const ProfileManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;
        setProfile(profileData);
      } catch (error: any) {
        toast.error("Erreur lors du chargement du profil: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mon profil</h1>
      </div>

      {loading ? (
        <div>Chargement...</div>
      ) : !profile ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Vous devez d'abord créer votre profil pour accéder à cette section</p>
          <Link to="/mon-espace/profil/nouveau">
            <Button>Créer mon profil</Button>
          </Link>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Mon Profil</CardTitle>
            <CardDescription>Informations entreprise</CardDescription>
          </CardHeader>
          <CardContent>
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
              <Link to="/mon-espace/profil/modifier">
                <Button variant="outline" className="w-full">
                  Modifier mon profil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileManagement;
