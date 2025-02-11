
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContractFormValues, contractFormSchema, PaymentMilestone } from "@/types/contract";
import { Tables } from "@/integrations/supabase/types";

type Contract = Tables<"contracts">;

interface UseContractFormProps {
  mode: "create" | "edit";
  contract?: Contract;
}

export const useContractForm = ({ mode, contract }: UseContractFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const defaultValues: ContractFormValues = contract
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
        payment_milestones: (contract.payment_milestones || []) as PaymentMilestone[],
        billing_method: contract.billing_method as ContractFormValues["billing_method"] || undefined,
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
        project_id: undefined,
        is_full_project: false,
        selected_work_descriptions: [],
        payment_milestones: [],
        billing_method: undefined,
      };

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues,
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

      // Filter out milestones with 0%
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
            payment_milestones: validMilestones
          })
          .select()
          .single();

        if (contractError) throw contractError;

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
            payment_milestones: validMilestones
          })
          .eq("id", contract.id);

        if (contractError) throw contractError;

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
