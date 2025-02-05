
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Profile {
  id: string;
  siret: string | null;
  company_address: string | null;
  company_name: string | null;
  legal_representative_first_name: string | null;
  legal_representative_last_name: string | null;
  completed: boolean | null;
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
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;
        setProfile(data);
      } catch (error: any) {
        toast.error("Erreur lors du chargement du profil : " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleCreateProfile = () => {
    navigate("/mon-espace/profil/nouveau");
  };

  const handleEditProfile = () => {
    navigate("/mon-espace/profil/modifier");
  };

  if (!user) return null;

  return (
    <Layout
      title="Mon profil - Le Coup de Main"
      description="Gérer mon profil - Le Coup de Main"
      canonicalUrl="https://lecoup-demain.com/mon-espace/profil"
    >
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mon profil</h1>
          {!profile?.completed && (
            <Button onClick={handleCreateProfile} className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Créer mon profil
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">Chargement du profil...</div>
        ) : !profile?.completed ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Vous n'avez pas encore créé votre profil.</p>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{profile.company_name || "Sans nom"}</CardTitle>
              <CardDescription>SIRET: {profile.siret || "Non renseigné"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  Représentant légal: {profile.legal_representative_first_name} {profile.legal_representative_last_name}
                </p>
                <p className="text-sm">{profile.company_address}</p>
                <div className="flex space-x-2 mt-4">
                  <Button
                    onClick={handleEditProfile}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ProfileManagement;
