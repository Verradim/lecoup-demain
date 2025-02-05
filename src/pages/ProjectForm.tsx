
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WorkTitle, Project } from "./project-form/types";
import { WorkTitleInput } from "./project-form/WorkTitleInput";
import { DateInputs } from "./project-form/DateInputs";
import { QuoteFileInput } from "./project-form/QuoteFileInput";

interface ProjectFormProps {
  project?: Project;
  mode?: "create" | "edit";
}

const ProjectForm = ({ project, mode = "create" }: ProjectFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    if (!user) return;

    try {
      setLoading(true);

      // Filter out empty titles and descriptions
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
        user_id: user.id,
      };

      if (mode === "edit" && project) {
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);

        if (updateError) throw updateError;
      } else {
        const { data: newProject, error: createError } = await supabase
          .from("projects")
          .insert(projectData)
          .select()
          .single();

        if (createError) throw createError;
        project = newProject;
      }

      // Handle quote file upload if present
      if (quoteFile && project) {
        const fileExt = quoteFile.name.split('.').pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('quotes')
          .upload(filePath, quoteFile);

        if (uploadError) throw uploadError;

        // Update project with quote file info
        const { error: updateError } = await supabase
          .from('projects')
          .update({
            quote_file_path: filePath,
            quote_file_name: quoteFile.name
          })
          .eq('id', project.id);

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

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            {mode === "edit" ? "Modifier le chantier" : "Créer un nouveau chantier"}
          </h1>
          <p className="mt-2 text-gray-600">
            {mode === "edit" 
              ? "Modifiez les informations de votre chantier ci-dessous."
              : "Remplissez les informations ci-dessous pour créer votre nouveau chantier."}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du chantier</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: Rénovation complète salle de bain"
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <Label>Intitulés de travaux</Label>
            {workTitles.map((workTitle, titleIndex) => (
              <WorkTitleInput
                key={titleIndex}
                workTitle={workTitle}
                titleIndex={titleIndex}
                onUpdateTitle={updateWorkTitle}
                onRemoveTitle={removeWorkTitle}
                onUpdateDescription={updateDescription}
                onAddDescription={addDescription}
                onRemoveDescription={removeDescription}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addWorkTitle}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un intitulé de travaux
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lieu d'exécution des travaux</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Adresse complète du chantier"
              className="w-full"
            />
          </div>

          <DateInputs
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />

          <QuoteFileInput
            quoteFile={quoteFile}
            currentFileName={project?.quote_file_name}
            onFileChange={setQuoteFile}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !name}
          >
            {loading 
              ? (mode === "edit" ? "Modification en cours..." : "Création en cours...") 
              : (mode === "edit" ? "Enregistrer les modifications" : "Créer le chantier")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
