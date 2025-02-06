
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ContractFormValues, contractFormSchema } from "@/types/contract";

export const useContractForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
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
      navigate("/mon-espace/contrats");
    } catch (error: any) {
      toast.error("Erreur lors de la création du contrat: " + error.message);
    }
  };

  return { form, onSubmit };
};
