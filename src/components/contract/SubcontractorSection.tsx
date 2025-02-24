
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { ContractFormValues } from "@/types/contract";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { SubcontractorSelectField } from "./SubcontractorSelectField";
import { SubcontractorPreview } from "./SubcontractorPreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

type Subcontractor = Tables<"subcontractors">;

interface SubcontractorSectionProps {
  form: UseFormReturn<ContractFormValues>;
}

export const SubcontractorSection = ({ form }: SubcontractorSectionProps) => {
  const { user } = useAuth();

  const { data: subcontractors } = useQuery({
    queryKey: ["subcontractors", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("subcontractors")
        .select("*")
        .eq("user_id", user.id); // Ne sélectionner que les sous-traitants de l'utilisateur courant

      if (error) throw error;
      return data as Subcontractor[];
    },
    enabled: !!user,
  });

  const handleSubcontractorChange = (subcontractorId: string) => {
    form.setValue("subcontractor_id", subcontractorId);
  };

  const selectedSubcontractorId = form.watch("subcontractor_id");
  const selectedSubcontractor = subcontractors?.find((s) => s.id === selectedSubcontractorId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sous-traitant</CardTitle>
        <CardDescription>Informations sur le sous-traitant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SubcontractorSelectField
          form={form}
          subcontractors={subcontractors}
          onSubcontractorChange={handleSubcontractorChange}
        />

        {selectedSubcontractor && (
          <SubcontractorPreview subcontractor={selectedSubcontractor} />
        )}
      </CardContent>
    </Card>
  );
};
