
import { WorkTitle } from "@/pages/project-form/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkItemsSelect } from "./WorkItemsSelect";
import { ProjectSelectField } from "./ProjectSelectField";
import { UseFormReturn } from "react-hook-form";
import { ContractFormValues } from "@/types/contract";
import { Project } from "@/pages/project-form/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface WorkTitlesSelectProps {
  form: UseFormReturn<ContractFormValues>;
  onProjectChange: (projectId: string) => void;
}

export const WorkTitlesSelect = ({ form, onProjectChange }: WorkTitlesSelectProps) => {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*");

      if (error) throw error;
      return data as Project[];
    },
  });

  const selectedProjectId = form.watch("project_id");
  const selectedDescriptions = form.watch("selected_work_descriptions") || [];
  const isFullProject = form.watch("is_full_project");

  const { data: workTitles } = useQuery({
    queryKey: ["workTitles", selectedProjectId],
    queryFn: async () => {
      if (!selectedProjectId) return [];
      
      const { data, error } = await supabase
        .from("work_titles")
        .select(`
          id,
          title,
          work_descriptions (
            id,
            description
          )
        `)
        .eq("project_id", selectedProjectId);

      if (error) throw error;
      return data as WorkTitle[];
    },
    enabled: !!selectedProjectId,
  });

  const handleSelectAll = (checked: boolean) => {
    form.setValue("is_full_project", checked);
    if (checked && workTitles) {
      const allDescriptions = workTitles.flatMap(title => 
        title.work_descriptions.map(desc => desc.id || '')
      );
      form.setValue("selected_work_descriptions", allDescriptions);
    } else {
      form.setValue("selected_work_descriptions", []);
    }
  };

  const handleSelectDescription = (descriptionId: string, checked: boolean) => {
    const currentSelections = form.getValues("selected_work_descriptions") || [];
    const newSelections = checked
      ? [...currentSelections, descriptionId]
      : currentSelections.filter(id => id !== descriptionId);
    
    form.setValue("selected_work_descriptions", newSelections);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du chantier</CardTitle>
        <CardDescription>Sélectionnez le chantier et les travaux</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProjectSelectField
          form={form}
          projects={projects}
          onProjectChange={onProjectChange}
        />

        {selectedProjectId && workTitles && (
          <div className="border rounded-lg p-4">
            <WorkItemsSelect
              workTitles={workTitles}
              selectedDescriptions={selectedDescriptions}
              isFullProject={isFullProject}
              onSelectAll={handleSelectAll}
              onSelectDescription={handleSelectDescription}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
