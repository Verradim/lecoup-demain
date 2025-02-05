
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProjectForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quoteFile, setQuoteFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      // Create the project first
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          name,
          description,
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Créer un nouveau chantier</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du chantier</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Entrez le nom du chantier"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre chantier (optionnel)"
                rows={4}
              />
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
