
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { WorkTitle, Project } from "./types";
import { WorkTitleInput } from "./WorkTitleInput";
import { DateInputs } from "./DateInputs";
import { QuoteFileInput } from "./QuoteFileInput";

interface FormContentProps {
  formState: {
    name: string;
    workTitles: WorkTitle[];
    location: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    quoteFile: File | null;
    loading: boolean;
  };
  actions: {
    setName: (name: string) => void;
    setLocation: (location: string) => void;
    setStartDate: (date: Date | undefined) => void;
    setEndDate: (date: Date | undefined) => void;
    setQuoteFile: (file: File | null) => void;
    addWorkTitle: () => void;
    removeWorkTitle: (index: number) => void;
    updateWorkTitle: (index: number, value: string) => void;
    addDescription: (titleIndex: number) => void;
    removeDescription: (titleIndex: number, descIndex: number) => void;
    updateDescription: (titleIndex: number, descIndex: number, value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
  };
  mode?: "create" | "edit";
  project?: Project;
}

export const FormContent = ({ formState, actions, mode = "create", project }: FormContentProps) => {
  const { 
    name, workTitles, location, startDate, 
    endDate, quoteFile, loading 
  } = formState;

  return (
    <form onSubmit={actions.handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du chantier</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => actions.setName(e.target.value)}
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
            onUpdateTitle={actions.updateWorkTitle}
            onRemoveTitle={actions.removeWorkTitle}
            onUpdateDescription={actions.updateDescription}
            onAddDescription={actions.addDescription}
            onRemoveDescription={actions.removeDescription}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={actions.addWorkTitle}
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
          onChange={(e) => actions.setLocation(e.target.value)}
          placeholder="Adresse complète du chantier"
          className="w-full"
        />
      </div>

      <DateInputs
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={actions.setStartDate}
        onEndDateChange={actions.setEndDate}
      />

      <QuoteFileInput
        quoteFile={quoteFile}
        currentFileName={project?.quote_file_name}
        onFileChange={actions.setQuoteFile}
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
  );
};

