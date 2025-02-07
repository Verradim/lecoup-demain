
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/profile";
import { Project } from "@/pages/project-form/types";
import { ContractActions } from "./ContractActions";
import { GeneralInfoCard } from "./cards/GeneralInfoCard";
import { ProjectDetailsCard } from "./cards/ProjectDetailsCard";
import { ProfilePreview } from "./ProfilePreview";
import { SubcontractorPreview } from "./SubcontractorPreview";
import { useNavigate } from "react-router-dom";

type Contract = Tables<"contracts">;

interface ContractDetailsProps {
  contract: Contract;
  onDelete: () => Promise<void>;
}

export const ContractDetails = ({ contract, onDelete }: ContractDetailsProps) => {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profiles", contract.profile_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", contract.profile_id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  const { data: subcontractor } = useQuery({
    queryKey: ["subcontractors", contract.subcontractor_id],
    queryFn: async () => {
      if (!contract.subcontractor_id) return null;
      const { data, error } = await supabase
        .from("subcontractors")
        .select("*")
        .eq("id", contract.subcontractor_id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!contract.subcontractor_id,
  });

  const { data: project } = useQuery({
    queryKey: ["projects", contract.project_id],
    queryFn: async () => {
      if (!contract.project_id) return null;
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          work_titles (
            id,
            title,
            work_descriptions (
              id,
              description
            )
          )
        `)
        .eq("id", contract.project_id)
        .single();

      if (error) throw error;
      return data as Project;
    },
    enabled: !!contract.project_id,
  });

  const handleDelete = async () => {
    try {
      await onDelete();
      toast.success("Contrat supprimé avec succès");
      navigate("/mon-espace/contrats");
    } catch (error: any) {
      toast.error("Erreur lors de la suppression du contrat: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <ContractActions contractId={contract.id} onDelete={handleDelete} />
      <GeneralInfoCard contract={contract} />
      {profile && <ProfilePreview profile={profile} />}
      {subcontractor && <SubcontractorPreview subcontractor={subcontractor} />}
      {project && <ProjectDetailsCard project={project} contract={contract} />}
    </div>
  );
};
