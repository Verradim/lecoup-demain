import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Upload, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

const ProjectForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState<string[]>(["", ""]);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [quoteFile, setQuoteFile] = useState<File | null>(null);

  const addDescriptionLine = () => {
    setDescriptions([...descriptions, ""]);
  };

  const removeDescriptionLine = (index: number) => {
    const newDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(newDescriptions);
  };

  const updateDescription = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      // Filter out empty descriptions
      const filteredDescriptions = descriptions.filter(desc => desc.trim() !== "");

      // Create the project first
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          name,
          detailed_descriptions: filteredDescriptions,
          work_location: location,
          start_date: startDate?.toISOString(),
          end_date: endDate?.toISOString(),
          user_id: user.id,
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // If there's a quote file, upload it
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

      toast.success("Projet créé avec succès");
      navigate("/projets");
    } catch (error: any) {
      toast.error("Erreur lors de la création du projet : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <Layout
      title="Créer un nouveau chantier - Le Coup de Main"
      description="Créer un nouveau chantier sur Le Coup de Main"
      canonicalUrl="https://lecoup-demain.com/projets/nouveau"
    >
      <div className="container py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Créer un nouveau chantier</h1>
            <p className="mt-2 text-gray-600">
              Remplissez les informations ci-dessous pour créer votre nouveau chantier.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Intitulé des travaux</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ex: Rénovation complète salle de bain"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Description détaillée des travaux</Label>
              <div className="space-y-3">
                {descriptions.map((desc, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={desc}
                      onChange={(e) => updateDescription(index, e.target.value)}
                      placeholder="Ex: Alimentation en eau chaude/froide"
                      className="flex-1"
                    />
                    {descriptions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeDescriptionLine(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addDescriptionLine}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une ligne
                </Button>
              </div>
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date de début des travaux</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Date de fin du contrat</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote">Devis original (PDF)</Label>
              <div className="mt-1">
                <label
                  htmlFor="quote"
                  className="flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                >
                  <span className="flex items-center space-x-2">
                    <Upload className="w-6 h-6 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {quoteFile ? quoteFile.name : "Cliquez pour uploader le devis"}
                    </span>
                  </span>
                  <input
                    id="quote"
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setQuoteFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !name}
            >
              {loading ? "Création en cours..." : "Créer le chantier"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectForm;