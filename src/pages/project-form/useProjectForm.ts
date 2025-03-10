
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WorkTitle, Project, WorkDescription } from "./types";

interface UseProjectFormProps {
  project?: Project;
  mode?: "create" | "edit";
  userId: string;
}

export const useProjectForm = ({ project, mode = "create", userId }: UseProjectFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(project?.name ?? "");
  const [workTitles, setWorkTitles] = useState<WorkTitle[]>(
    project?.work_titles ?? [{ title: "", work_descriptions: [{ description: "" }] }]
  );
  const [location, setLocation] = useState(project?.work_location ?? "");
  const [amountHt, setAmountHt] = useState<string>(project?.amount_ht?.toString() ?? "");
  const [startDate, setStartDate] = useState<Date | undefined>(
    project?.start_date ? new Date(project.start_date) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    project?.end_date ? new Date(project.end_date) : undefined
  );
  const [quoteFile, setQuoteFile] = useState<File | null>(null);

  const addWorkTitle = () => {
    setWorkTitles([...workTitles, { title: "", work_descriptions: [{ description: "" }] }]);
  };

  const removeWorkTitle = (titleIndex: number) => {
    const newWorkTitles = workTitles.filter((_, i) => i !== titleIndex);
    setWorkTitles(newWorkTitles);
  };

  const updateWorkTitle = (titleIndex: number, value: string) => {
    const newWorkTitles = [...workTitles];
    newWorkTitles[titleIndex].title = value;
    setWorkTitles(newWorkTitles);
  };

  const addDescription = (titleIndex: number) => {
    const newWorkTitles = [...workTitles];
    newWorkTitles[titleIndex].work_descriptions.push({ description: "" });
    setWorkTitles(newWorkTitles);
  };

  const removeDescription = (titleIndex: number, descIndex: number) => {
    const newWorkTitles = [...workTitles];
    newWorkTitles[titleIndex].work_descriptions = newWorkTitles[titleIndex].work_descriptions.filter(
      (_, i) => i !== descIndex
    );
    setWorkTitles(newWorkTitles);
  };

  const updateDescription = (titleIndex: number, descIndex: number, value: string) => {
    const newWorkTitles = [...workTitles];
    newWorkTitles[titleIndex].work_descriptions[descIndex].description = value;
    setWorkTitles(newWorkTitles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const filteredWorkTitles = workTitles.filter(
        title => title.title.trim() !== "" && title.work_descriptions.some(desc => desc.description.trim() !== "")
      ).map(title => ({
        ...title,
        work_descriptions: title.work_descriptions.filter(desc => desc.description.trim() !== "")
      }));

      const projectData = {
        name,
        work_location: location,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        amount_ht: amountHt ? parseFloat(amountHt) : null,
        user_id: userId,
      };

      let updatedProject: Project | null = null;

      if (mode === "edit" && project) {
        const { data: updatedProjectData, error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id)
          .select()
          .single();

        if (updateError) throw updateError;
        updatedProject = updatedProjectData;

        // Delete existing work titles (cascade will handle descriptions)
        const { error: deleteError } = await supabase
          .from("work_titles")
          .delete()
          .eq("project_id", project.id);

        if (deleteError) throw deleteError;
      } else {
        const { data: newProjectData, error: createError } = await supabase
          .from("projects")
          .insert(projectData)
          .select()
          .single();

        if (createError) throw createError;
        updatedProject = newProjectData;
      }

      if (!updatedProject) throw new Error("Failed to create/update project");

      // Insert new work titles and descriptions
      for (const workTitle of filteredWorkTitles) {
        const { data: titleData, error: titleError } = await supabase
          .from("work_titles")
          .insert({
            project_id: updatedProject.id,
            title: workTitle.title,
          })
          .select()
          .single();

        if (titleError) throw titleError;

        const descriptionsToInsert = workTitle.work_descriptions.map(desc => ({
          work_title_id: titleData.id,
          description: desc.description,
        }));

        const { error: descriptionsError } = await supabase
          .from("work_descriptions")
          .insert(descriptionsToInsert);

        if (descriptionsError) throw descriptionsError;
      }

      if (quoteFile) {
        const fileExt = quoteFile.name.split('.').pop();
        const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('quotes')
          .upload(filePath, quoteFile);

        if (uploadError) throw uploadError;

        const { error: updateError } = await supabase
          .from('projects')
          .update({
            quote_file_path: filePath,
            quote_file_name: quoteFile.name
          })
          .eq('id', updatedProject.id);

        if (updateError) throw updateError;
      }

      toast.success(mode === "edit" ? "Projet modifié avec succès" : "Projet créé avec succès");
      navigate("/mon-espace/projets");
    } catch (error: any) {
      toast.error(`Erreur lors de la ${mode === "edit" ? "modification" : "création"} du projet : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    formState: {
      name,
      workTitles,
      location,
      amountHt,
      startDate,
      endDate,
      quoteFile,
      loading
    },
    actions: {
      setName,
      setLocation,
      setAmountHt,
      setStartDate,
      setEndDate,
      setQuoteFile,
      addWorkTitle,
      removeWorkTitle,
      updateWorkTitle,
      addDescription,
      removeDescription,
      updateDescription,
      handleSubmit
    }
  };
};
