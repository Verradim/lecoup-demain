
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WorkTitle, Project } from "./types";

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
    project?.work_titles ?? [{ title: "", descriptions: ["", ""] }]
  );
  const [location, setLocation] = useState(project?.work_location ?? "");
  const [startDate, setStartDate] = useState<Date | undefined>(
    project?.start_date ? new Date(project.start_date) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    project?.end_date ? new Date(project.end_date) : undefined
  );
  const [quoteFile, setQuoteFile] = useState<File | null>(null);

  const addWorkTitle = () => {
    setWorkTitles([...workTitles, { title: "", descriptions: ["", ""] }]);
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
    newWorkTitles[titleIndex].descriptions.push("");
    setWorkTitles(newWorkTitles);
  };

  const removeDescription = (titleIndex: number, descIndex: number) => {
    const newWorkTitles = [...workTitles];
    newWorkTitles[titleIndex].descriptions = newWorkTitles[titleIndex].descriptions.filter(
      (_, i) => i !== descIndex
    );
    setWorkTitles(newWorkTitles);
  };

  const updateDescription = (titleIndex: number, descIndex: number, value: string) => {
    const newWorkTitles = [...workTitles];
    newWorkTitles[titleIndex].descriptions[descIndex] = value;
    setWorkTitles(newWorkTitles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const filteredWorkTitles = workTitles.filter(
        title => title.title.trim() !== "" && title.descriptions.some(desc => desc.trim() !== "")
      ).map(title => ({
        ...title,
        descriptions: title.descriptions.filter(desc => desc.trim() !== "")
      }));

      const projectData = {
        name,
        work_location: location,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        user_id: userId,
      };

      let projectId: string;

      if (mode === "edit" && project) {
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);

        if (updateError) throw updateError;
        projectId = project.id;

        // Delete existing work titles and descriptions
        await supabase
          .from("work_titles")
          .delete()
          .eq("project_id", projectId);
      } else {
        const { data: newProject, error: createError } = await supabase
          .from("projects")
          .insert(projectData)
          .select()
          .single();

        if (createError) throw createError;
        projectId = newProject.id;
      }

      // Insert work titles and descriptions
      for (const workTitle of filteredWorkTitles) {
        const { data: newWorkTitle, error: workTitleError } = await supabase
          .from("work_titles")
          .insert({
            project_id: projectId,
            title: workTitle.title,
          })
          .select()
          .single();

        if (workTitleError) throw workTitleError;

        // Insert descriptions for this work title
        const descriptionsToInsert = workTitle.descriptions.map(description => ({
          work_title_id: newWorkTitle.id,
          description,
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
          .eq('id', projectId);

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
      startDate,
      endDate,
      quoteFile,
      loading
    },
    actions: {
      setName,
      setLocation,
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
