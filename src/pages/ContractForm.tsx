import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ContractNameField } from "@/components/contract/ContractNameField";
import { ProfileSelectField } from "@/components/contract/ProfileSelectField";
import { ProfilePreview } from "@/components/contract/ProfilePreview";
import { useContractForm } from "@/hooks/useContractForm";
import { Profile } from "@/types/profile";

const ContractForm = () => {
  const navigate = useNavigate();
  const { form, onSubmit } = useContractForm();

  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("completed", true);

      if (error) throw error;
      return data as Profile[];
    },
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Créer un nouveau contrat</h1>
        <p className="text-muted-foreground mt-1">
          Remplissez les informations ci-dessous pour créer un nouveau contrat
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContractNameField form={form} />
          <ProfileSelectField
            form={form}
            profiles={profiles}
            onProfileChange={handleProfileChange}
          />

          {selectedProfile && (
            <ProfilePreview profile={selectedProfile} />
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/mon-espace/contrats")}
            >
              Annuler
            </Button>
            <Button type="submit">Créer le contrat</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContractForm;