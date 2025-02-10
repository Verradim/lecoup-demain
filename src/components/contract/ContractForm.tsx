
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ContractNameField } from "@/components/contract/ContractNameField";
import { ClientSection } from "@/components/contract/ClientSection";
import { SubcontractorSection } from "@/components/contract/SubcontractorSection";
import { WorkTitlesSelect } from "@/components/contract/WorkTitlesSelect";
import { PaymentSchedule } from "@/components/contract/PaymentSchedule";
import { useContractForm } from "@/hooks/useContractForm";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Contract = Tables<"contracts">;

interface ContractFormProps {
  mode: "create" | "edit";
  contract?: Contract;
}

export const ContractForm = ({ mode, contract }: ContractFormProps) => {
  const navigate = useNavigate();
  const { form, onSubmit } = useContractForm({ mode, contract });

  const projectId = form.watch("project_id");

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) return null;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });

  const handleProjectChange = (projectId: string) => {
    form.setValue("project_id", projectId);
    form.setValue("selected_work_descriptions", []);
    form.setValue("is_full_project", false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContractNameField form={form} />
        
        <ClientSection form={form} />
        
        <SubcontractorSection form={form} />

        <WorkTitlesSelect
          form={form}
          onProjectChange={handleProjectChange}
        />

        {project && (
          <PaymentSchedule
            form={form}
            projectStartDate={project.start_date ? new Date(project.start_date) : undefined}
            projectEndDate={project.end_date ? new Date(project.end_date) : undefined}
            totalAmount={project.amount_ht}
          />
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/mon-espace/contrats")}
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={form.watch("payment_milestones")?.reduce(
              (sum, milestone) => sum + milestone.percentage,
              0
            ) !== 100}
          >
            {mode === "create" ? "Créer le contrat" : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
