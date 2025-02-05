
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
        work_titles: filteredWorkTitles,
        work_location: location,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        user_id: userId,
      };

      let updatedProject = project;

      if (mode === "edit" && project) {
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);

        if (updateError) throw updateError;
      } else {
        const { data: newProjectData, error: createError } = await supabase
          .from("projects")
          .insert(projectData)
          .select()
          .single();

        if (createError) throw createError;

        const typedProject: Project = {
          ...newProjectData,
          work_titles: newProjectData.work_titles ? newProjectData.work_titles.map((wt: any) => ({
            title: wt.title,
            descriptions: wt.descriptions
          })) : null
        };
        updatedProject = typedProject;
      }

      if (quoteFile && updatedProject) {
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
      navigate("/projets");
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
