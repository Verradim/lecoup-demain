
import { ContractActions } from "./ContractActions";
import { GeneralInfoCard } from "./cards/GeneralInfoCard";
import { ProjectDetailsCard } from "./cards/ProjectDetailsCard";
import { GeneratedContractCard } from "./cards/GeneratedContractCard";
import { Tables } from "@/integrations/supabase/types";
import { GenerateContractButton } from "./GenerateContractButton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/pages/project-form/types";

type Contract = Tables<"contracts">;

interface ContractDetailsProps {
  contract: Contract;
  onDelete: () => Promise<void>;
}

export const ContractDetails = ({ contract, onDelete }: ContractDetailsProps) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ContractActions contractId={contract.id} onDelete={onDelete} />
        {contract.status !== "generated" && <GenerateContractButton contract={contract} />}
      </div>
      
      <GeneralInfoCard contract={contract} />
      {project && <ProjectDetailsCard project={project} contract={contract} />}
      {contract.status === "generated" && (
        <GeneratedContractCard contractId={contract.id} />
      )}
    </div>
  );
};
