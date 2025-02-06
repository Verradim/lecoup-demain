
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { ContractFormValues } from "@/types/contract";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { SubcontractorSelectField } from "./SubcontractorSelectField";
import { SubcontractorPreview } from "./SubcontractorPreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Subcontractor = Tables<"subcontractors">;

interface SubcontractorSectionProps {
  form: UseFormReturn<ContractFormValues>;
}

export const SubcontractorSection = ({ form }: SubcontractorSectionProps) => {
  const { data: subcontractors } = useQuery({
    queryKey: ["subcontractors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subcontractors")
        .select("*");

      if (error) throw error;
      return data as Subcontractor[];
    },
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
