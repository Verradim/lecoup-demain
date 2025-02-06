import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/Layout";
import { FileUpload } from "@/components/subcontractor/FileUpload";

export const SubcontractorForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    siret: "",
    companyAddress: "",
    legalRepresentativeFirstName: "",
    legalRepresentativeLastName: "",
  });
  const [vigilanceProof, setVigilanceProof] = useState<File | null>(null);
  const [insuranceProof, setInsuranceProof] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      // Upload files if they exist
      let vigilanceProofPath = null;
      let insuranceProofPath = null;

      if (vigilanceProof) {
        const fileExt = vigilanceProof.name.split('.').pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('subcontractor-docs')
          .upload(filePath, vigilanceProof);

        if (uploadError) throw uploadError;
        vigilanceProofPath = filePath;
      }

      if (insuranceProof) {
        const fileExt = insuranceProof.name.split('.').pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('subcontractor-docs')
          .upload(filePath, insuranceProof);

        if (uploadError) throw uploadError;
        insuranceProofPath = filePath;
      }

      // Create subcontractor record
      const { error } = await supabase.from('subcontractors').insert({
        user_id: user.id,
        company_name: formData.companyName,
        siret: formData.siret,
        company_address: formData.companyAddress,
        legal_representative_first_name: formData.legalRepresentativeFirstName,
        legal_representative_last_name: formData.legalRepresentativeLastName,
        vigilance_proof_path: vigilanceProofPath,
        vigilance_proof_name: vigilanceProof?.name,
        insurance_proof_path: insuranceProofPath,
        insurance_proof_name: insuranceProof?.name,
      });

      if (error) throw error;

      toast.success("Sous-traitant ajouté avec succès");
      navigate("/mon-espace");
    } catch (error: any) {
      console.error('Error:', error);
      toast.error("Erreur lors de l'ajout du sous-traitant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Ajouter un sous-traitant - Le Coup de Main"
      description="Ajoutez un nouveau sous-traitant à votre espace"
      canonicalUrl="https://lecoup-demain.com/mon-espace/sous-traitants/nouveau"
    >
      <div className="container max-w-2xl py-8">
        <h1 className="text-3xl font-bold mb-8">Ajouter un sous-traitant</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nom de l'entreprise</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siret">SIRET</Label>
            <Input
              id="siret"
              value={formData.siret}
              onChange={(e) => setFormData(prev => ({ ...prev, siret: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyAddress">Adresse de l'entreprise</Label>
            <Input
              id="companyAddress"
              value={formData.companyAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, companyAddress: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="legalRepresentativeFirstName">Prénom du représentant légal</Label>
            <Input
              id="legalRepresentativeFirstName"
              value={formData.legalRepresentativeFirstName}
              onChange={(e) => setFormData(prev => ({ ...prev, legalRepresentativeFirstName: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="legalRepresentativeLastName">Nom du représentant légal</Label>
            <Input
              id="legalRepresentativeLastName"
              value={formData.legalRepresentativeLastName}
              onChange={(e) => setFormData(prev => ({ ...prev, legalRepresentativeLastName: e.target.value }))}
              required
            />
          </div>

          <FileUpload
            label="Attestation de vigilance"
            file={vigilanceProof}
            onFileChange={setVigilanceProof}
          />

          <FileUpload
            label="Attestation d'assurance"
            file={insuranceProof}
            onFileChange={setInsuranceProof}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Ajout en cours..." : "Ajouter le sous-traitant"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default SubcontractorForm;