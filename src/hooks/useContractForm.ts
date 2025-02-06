
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
    defaultValues: contract ? {
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
    } : {
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
    },
  });

  const onSubmit = async (values: ContractFormValues) => {
    try {
      if (mode === "create") {
        const { error } = await supabase.from("contracts").insert({
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
        });

        if (error) throw error;

        toast.success("Contrat créé avec succès");
      } else if (contract?.id) {
        const { error } = await supabase
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
          })
          .eq("id", contract.id);

        if (error) throw error;

        toast.success("Contrat modifié avec succès");
      }

      navigate("/mon-espace/contrats");
    } catch (error: any) {
      toast.error("Erreur lors de l'enregistrement du contrat: " + error.message);
    }
  };

  return { form, onSubmit };
};
