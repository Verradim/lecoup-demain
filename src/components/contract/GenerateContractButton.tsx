
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";

type Contract = Tables<"contracts">;

interface GenerateContractButtonProps {
  contract: Contract;
}

export const GenerateContractButton = ({ contract }: GenerateContractButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleGenerate = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      console.log("Starting contract generation for contract:", contract);

      // Fetch profile data to get email
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", contract.profile_id)
        .single();

      if (!profile) throw new Error("Profile not found");

      // Fetch subcontractor data if it exists
      let subcontractorData = null;
      if (contract.subcontractor_id) {
        const { data: subcontractor } = await supabase
          .from("subcontractors")
          .select("*")
          .eq("id", contract.subcontractor_id)
          .single();
        subcontractorData = subcontractor;
      }

      // Fetch project data if it exists
      let projectData = null;
      let workTitlesData = [];
      if (contract.project_id) {
        console.log("Fetching project data for project_id:", contract.project_id);
        
        const { data: project } = await supabase
          .from("projects")
          .select("*")
          .eq("id", contract.project_id)
          .single();
        projectData = project;

        // Fetch work titles and their descriptions
        const { data: workTitles, error: workTitlesError } = await supabase
          .from("work_titles")
          .select(`
            id,
            title,
            work_descriptions (
              id,
              description
            )
          `)
          .eq("project_id", contract.project_id);

        if (workTitlesError) {
          console.error("Error fetching work titles:", workTitlesError);
        }
          
        workTitlesData = workTitles || [];
        console.log("Fetched work titles:", workTitlesData);
      }

      // Prepare work titles and descriptions text
      const selectedDescriptions = contract.selected_work_descriptions || [];
      console.log("Selected descriptions:", selectedDescriptions);
      console.log("Is full project:", contract.is_full_project);

      const workTitlesDescription = workTitlesData
        .map(title => {
          console.log("Processing title:", title);
          const descriptions = title.work_descriptions
            .filter(desc => {
              const include = contract.is_full_project || selectedDescriptions.includes(desc.id);
              console.log("Description:", desc, "Include:", include);
              return include;
            })
            .map(desc => desc.description)
            .join("\n- ");
          
          if (descriptions) {
            return `${title.title}:\n- ${descriptions}`;
          }
          return null;
        })
        .filter(Boolean)
        .join("\n\n");

      console.log("Final work titles description:", workTitlesDescription);

      // Insert into generated_contracts
      const { error } = await supabase
        .from("generated_contracts")
        .insert({
          contract_id: contract.id,
          user_id: user.id,
          email: profile.email || "",
          siret: contract.siret,
          company_address: contract.company_address,
          company_name: contract.company_name,
          legal_representative_first_name: contract.legal_representative_first_name,
          legal_representative_last_name: contract.legal_representative_last_name,
          subcontractor_id: subcontractorData?.id || null,
          subcontractor_company_name: subcontractorData?.company_name || null,
          subcontractor_siret: subcontractorData?.siret || null,
          subcontractor_company_address: subcontractorData?.company_address || null,
          subcontractor_legal_representative_first_name: subcontractorData?.legal_representative_first_name || null,
          subcontractor_legal_representative_last_name: subcontractorData?.legal_representative_last_name || null,
          project_id: projectData?.id || null,
          work_location: projectData?.work_location || null,
          start_date: projectData?.start_date || null,
          end_date: projectData?.end_date || null,
          work_titles_description: workTitlesDescription || null,
          amount_ht: projectData?.amount_ht || null
        });

      if (error) {
        console.error("Error inserting generated contract:", error);
        throw error;
      }

      // Update contract status
      const { error: updateError } = await supabase
        .from("contracts")
        .update({ status: "generated" })
        .eq("id", contract.id);

      if (updateError) throw updateError;

      await queryClient.invalidateQueries({ queryKey: ["contracts"] });
      await queryClient.invalidateQueries({ queryKey: ["contracts", contract.id] });
      
      toast.success("Contrat généré avec succès");
    } catch (error: any) {
      console.error("Error generating contract:", error);
      toast.error("Erreur lors de la génération du contrat");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={contract.status === "generated" || isLoading}>
          <Wand2 className="w-4 h-4 mr-2" />
          Générer le contrat
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la génération</AlertDialogTitle>
          <AlertDialogDescription>
            Une fois le contrat généré, il ne sera plus possible de le modifier. Voulez-vous continuer ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleGenerate}>Confirmer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
