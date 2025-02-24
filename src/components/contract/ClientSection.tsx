
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { ContractFormValues } from "@/types/contract";
import { Profile } from "@/types/profile";
import { supabase } from "@/integrations/supabase/client";
import { ProfileSelectField } from "./ProfileSelectField";
import { ProfilePreview } from "./ProfilePreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

interface ClientSectionProps {
  form: UseFormReturn<ContractFormValues>;
}

export const ClientSection = ({ form }: ClientSectionProps) => {
  const { user } = useAuth();

  const { data: profiles } = useQuery({
    queryKey: ["profiles", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("completed", true)
        .eq("id", user.id); // Ne sélectionner que le profil de l'utilisateur courant

      if (error) throw error;
      return data as Profile[];
    },
    enabled: !!user,
  });

  const handleProfileChange = (profileId: string) => {
    const selectedProfile = profiles?.find((p) => p.id === profileId);
    if (selectedProfile) {
      form.setValue("profile_id", profileId);
      form.setValue(
        "legal_representative_first_name",
        selectedProfile.legal_representative_first_name || ""
      );
      form.setValue(
        "legal_representative_last_name",
        selectedProfile.legal_representative_last_name || ""
      );
      form.setValue("siret", selectedProfile.siret || "");
      form.setValue("company_name", selectedProfile.company_name || "");
      form.setValue("company_address", selectedProfile.company_address || "");
    }
  };

  const selectedProfileId = form.watch("profile_id");
  const selectedProfile = profiles?.find((p) => p.id === selectedProfileId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donneur d'ordre</CardTitle>
        <CardDescription>Informations sur le donneur d'ordre</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileSelectField
          form={form}
          profiles={profiles}
          onProfileChange={handleProfileChange}
        />

        {selectedProfile && (
          <ProfilePreview profile={selectedProfile} />
        )}
      </CardContent>
    </Card>
  );
};
