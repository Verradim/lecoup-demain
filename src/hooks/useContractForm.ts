
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContractFormValues, contractFormSchema } from "@/types/contract";
import { Tables } from "@/integrations/supabase/types";

type Contract = Tables<"contracts">;

interface UseContractFormProps {
  mode: "create" | "edit";
  contract?: Contract;
}

export const useContractForm = ({ mode, contract }: UseContractFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: contract
      ? {
          name: contract.name,
          profile_id: contract.profile_id,
          subcontractor_id: contract.subcontractor_id,
          legal_representative_first_name: contract.legal_representative_first_name,
          legal_representative_last_name: contract.legal_representative_last_name,
          siret: contract.siret,
          company_name: contract.company_name,
          company_address: contract.company_address,
          project_id: contract.project_id || undefined,
          is_full_project: contract.is_full_project || false,
          selected_work_descriptions: contract.selected_work_descriptions || [],
          payment_milestones: [],
          billing_method: contract.billing_method || undefined,
        }
      : {
          name: "",
          profile_id: "",
          subcontractor_id: "",
          legal_representative_first_name: "",
          legal_representative_last_name: "",
          siret: "",
          company_name: "",
          company_address: "",
          project_id: "",
          is_full_project: false,
          selected_work_descriptions: [],
          payment_milestones: [],
          billing_method: undefined,
        },
  });

  const onSubmit = async (values: ContractFormValues) => {
    try {
      let projectAmountHt = null;
      if (values.project_id) {
        const { data: project } = await supabase
          .from("projects")
          .select("amount_ht")
          .eq("id", values.project_id)
          .single();
        
        if (project) {
          projectAmountHt = project.amount_ht;
        }
      }

      // Filter out milestones with 0% before saving
      const validMilestones = values.payment_milestones.filter(
        (milestone) => milestone.percentage > 0
      );

      if (mode === "create") {
        const { data: contractData, error: contractError } = await supabase
          .from("contracts")
          .insert({
            name: values.name,
            profile_id: values.profile_id,
            subcontractor_id: values.subcontractor_id,
            legal_representative_first_name: values.legal_representative_first_name,
            legal_representative_last_name: values.legal_representative_last_name,
            siret: values.siret,
            company_name: values.company_name,
            company_address: values.company_address,
            user_id: user?.id,
            status: "draft",
            project_id: values.project_id,
            is_full_project: values.is_full_project,
            selected_work_descriptions: values.selected_work_descriptions,
            amount_ht: projectAmountHt,
            billing_method: values.billing_method,
          })
          .select()
          .single();

        if (contractError) throw contractError;

        if (contractData) {
          const milestonesForDB = validMilestones.map(milestone => ({
            contract_id: contractData.id,
            description: milestone.description,
            percentage: milestone.percentage,
            milestone_date: milestone.milestone_date ? milestone.milestone_date.toISOString() : null,
            milestone_type: milestone.milestone_type,
            order_index: milestone.order_index
          }));

          const { error: milestonesError } = await supabase
            .from("payment_milestones")
            .insert(milestonesForDB);

          if (milestonesError) throw milestonesError;
        }

        toast.success("Contrat créé avec succès");
      } else if (mode === "edit" && contract?.id) {
        const { error: contractError } = await supabase
          .from("contracts")
          .update({
            name: values.name,
            profile_id: values.profile_id,
            subcontractor_id: values.subcontractor_id,
            legal_representative_first_name: values.legal_representative_first_name,
            legal_representative_last_name: values.legal_representative_last_name,
            siret: values.siret,
            company_name: values.company_name,
            company_address: values.company_address,
            project_id: values.project_id,
            is_full_project: values.is_full_project,
            selected_work_descriptions: values.selected_work_descriptions,
            amount_ht: projectAmountHt,
            billing_method: values.billing_method,
          })
          .eq("id", contract.id);

        if (contractError) throw contractError;

        // Delete existing milestones
        const { error: deleteError } = await supabase
          .from("payment_milestones")
          .delete()
          .eq("contract_id", contract.id);

        if (deleteError) throw deleteError;

        // Insert new milestones
        const milestonesForDB = validMilestones.map(milestone => ({
          contract_id: contract.id,
          description: milestone.description,
          percentage: milestone.percentage,
          milestone_date: milestone.milestone_date ? milestone.milestone_date.toISOString() : null,
          milestone_type: milestone.milestone_type,
          order_index: milestone.order_index
        }));

        const { error: milestonesError } = await supabase
          .from("payment_milestones")
          .insert(milestonesForDB);

        if (milestonesError) throw milestonesError;

        toast.success("Contrat modifié avec succès");
      }

      navigate("/mon-espace/contrats");
    } catch (error: any) {
      toast.error(
        "Erreur lors de l'enregistrement du contrat: " + error.message
      );
    }
  };

  return { form, onSubmit };
};
