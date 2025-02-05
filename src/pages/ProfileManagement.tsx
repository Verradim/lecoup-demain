
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  is_default: boolean;
}

const ProfileManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("parent_profile_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProfiles(data || []);
      } catch (error: any) {
        toast.error("Erreur lors du chargement des profils : " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [user, navigate]);

  const handleCreateProfile = () => {
    navigate("/projets/profil/nouveau");
  };

  const handleEditProfile = (profileId: string) => {
    navigate(`/projets/profil/${profileId}`);
  };

  const handleSetDefault = async (profileId: string) => {
    try {
      // First, remove default status from all profiles
      await supabase
        .from("profiles")
        .update({ is_default: false })
        .eq("parent_profile_id", user?.id);

      // Then set the selected profile as default
      const { error } = await supabase
        .from("profiles")
        .update({ is_default: true })
        .eq("id", profileId);

      if (error) throw error;
      
      toast.success("Profil défini par défaut avec succès");
      
      // Refresh profiles
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("parent_profile_id", user?.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setProfiles(data || []);
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour du profil : " + error.message);
    }
  };

  if (!user) return null;

  return (
    <Layout
      title="Mes profils - Le Coup de Main"
      description="Gérer mes profils - Le Coup de Main"
      canonicalUrl="https://lecoup-demain.com/projets/profil"
    >
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mes profils</h1>
          <Button onClick={handleCreateProfile} className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Créer un profil
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Chargement des profils...</div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Vous n'avez pas encore créé de profil.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Card key={profile.id} className={profile.is_default ? "border-primary" : ""}>
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
                        onClick={() => handleEditProfile(profile.id)}
                        variant="outline"
                        size="sm"
                      >
                        Modifier
                      </Button>
                      {!profile.is_default && (
                        <Button
                          onClick={() => handleSetDefault(profile.id)}
                          variant="secondary"
                          size="sm"
                        >
                          Définir par défaut
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfileManagement;
