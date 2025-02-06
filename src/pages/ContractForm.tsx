import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ContractNameField } from "@/components/contract/ContractNameField";
import { ProfileSelectField } from "@/components/contract/ProfileSelectField";
import { SubcontractorSelectField } from "@/components/contract/SubcontractorSelectField";
import { ProfilePreview } from "@/components/contract/ProfilePreview";
import { SubcontractorPreview } from "@/components/contract/SubcontractorPreview";
import { ProjectSelectField } from "@/components/contract/ProjectSelectField";
import { ProjectPreview } from "@/components/contract/ProjectPreview";
import { useContractForm } from "@/hooks/useContractForm";
import { Profile } from "@/types/profile";
import { Tables } from "@/integrations/supabase/types";
import { Project, WorkTitle } from "@/pages/project-form/types";

type Subcontractor = Tables<"subcontractors">;

const ContractForm = () => {
  const navigate = useNavigate();
  const { form, onSubmit } = useContractForm();

  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("completed", true);

      if (error) throw error;
      return data as Profile[];
    },
  });

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

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*");

      if (error) throw error;

      // Transform the data to match the Project type
      return data?.map(project => ({
        ...project,
        work_titles: project.work_titles?.map((wt: any) => ({
          title: wt.title,
          descriptions: wt.descriptions
        })) as WorkTitle[] | null
      })) as Project[];
    },
  });

  const handleProfileChange = (profileId: string) => {
    const selectedProfile = profiles?.find((p) => p.id === profileId);
    if (selectedProfile) {
      form.setValue("profile_id", profileId);
      form.setValue(
        "legal_representative_first_name",
        selectedProfile.legal_representative_first_name || ""
      );
      form.setValue(
        "legal_representative_last_name",
        selectedProfile.legal_representative_last_name || ""
      );
      form.setValue("siret", selectedProfile.siret || "");
      form.setValue("company_name", selectedProfile.company_name || "");
      form.setValue("company_address", selectedProfile.company_address || "");
    }
  };

  const handleSubcontractorChange = (subcontractorId: string) => {
    form.setValue("subcontractor_id", subcontractorId);
  };

  const handleProjectChange = (projectId: string) => {
    form.setValue("project_id", projectId);
  };

  const handleFullProjectChange = (checked: boolean) => {
    form.setValue("is_full_project", checked);
  };

  const selectedProfileId = form.watch("profile_id");
  const selectedProfile = profiles?.find((p) => p.id === selectedProfileId);

  const selectedSubcontractorId = form.watch("subcontractor_id");
  const selectedSubcontractor = subcontractors?.find(
    (s) => s.id === selectedSubcontractorId
  );

  const selectedProjectId = form.watch("project_id");
  const selectedProject = projects?.find((p) => p.id === selectedProjectId);
  const isFullProject = form.watch("is_full_project");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Créer un nouveau contrat</h1>
        <p className="text-muted-foreground mt-1">
          Remplissez les informations ci-dessous pour créer un nouveau contrat
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContractNameField form={form} />

          <div className="space-y-4">
            <ProfileSelectField
              form={form}
              profiles={profiles}
              onProfileChange={handleProfileChange}
            />

            {selectedProfile && <ProfilePreview profile={selectedProfile} />}
          </div>

          <div className="space-y-4">
            <SubcontractorSelectField
              form={form}
              subcontractors={subcontractors}
              onSubcontractorChange={handleSubcontractorChange}
            />

            {selectedSubcontractor && (
              <SubcontractorPreview subcontractor={selectedSubcontractor} />
            )}
          </div>

          <div className="space-y-4">
            <ProjectSelectField
              form={form}
              projects={projects}
              onProjectChange={handleProjectChange}
            />

            {selectedProject && (
              <ProjectPreview
                project={selectedProject}
                isFullProject={isFullProject}
                onFullProjectChange={handleFullProjectChange}
              />
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/mon-espace/contrats")}
            >
              Annuler
            </Button>
            <Button type="submit">Créer le contrat</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContractForm;