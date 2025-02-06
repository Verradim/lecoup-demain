import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SubcontractorFormFields, FormValues } from "@/components/subcontractor/SubcontractorFormFields";

const formSchema = z.object({
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  siret: z
    .string()
    .length(14, "Le SIRET doit contenir 14 chiffres")
    .regex(/^\d+$/, "Le SIRET ne doit contenir que des chiffres"),
  companyAddress: z.string().min(1, "L'adresse est requise"),
  legalRepresentativeFirstName: z.string().min(1, "Le prénom est requis"),
  legalRepresentativeLastName: z.string().min(1, "Le nom est requis"),
});

export const SubcontractorForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [vigilanceProof, setVigilanceProof] = useState<File | null>(null);
  const [insuranceProof, setInsuranceProof] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      siret: "",
      companyAddress: "",
      legalRepresentativeFirstName: "",
      legalRepresentativeLastName: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (!user) return;

    try {
      setLoading(true);

      let vigilanceProofPath = null;
      let vigilanceProofName = null;
      let insuranceProofPath = null;
      let insuranceProofName = null;

      if (vigilanceProof) {
        const fileExt = vigilanceProof.name.split('.').pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('subcontractor-docs')
          .upload(filePath, vigilanceProof);

        if (uploadError) throw uploadError;
        vigilanceProofPath = filePath;
        vigilanceProofName = vigilanceProof.name;
      }

      if (insuranceProof) {
        const fileExt = insuranceProof.name.split('.').pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('subcontractor-docs')
          .upload(filePath, insuranceProof);

        if (uploadError) throw uploadError;
        insuranceProofPath = filePath;
        insuranceProofName = insuranceProof.name;
      }

      const { error } = await supabase.from('subcontractors').insert({
        user_id: user.id,
        company_name: values.companyName,
        siret: values.siret,
        company_address: values.companyAddress,
        legal_representative_first_name: values.legalRepresentativeFirstName,
        legal_representative_last_name: values.legalRepresentativeLastName,
        vigilance_proof_path: vigilanceProofPath,
        vigilance_proof_name: vigilanceProofName,
        insurance_proof_path: insuranceProofPath,
        insurance_proof_name: insuranceProofName,
      });

      if (error) throw error;

      toast.success("Sous-traitant ajouté avec succès");
      navigate("/mon-espace/sous-traitants");
    } catch (error: any) {
      console.error('Error:', error);
      toast.error("Erreur lors de l'ajout du sous-traitant");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container max-w-2xl py-8">
        <h1 className="text-3xl font-bold mb-8">Ajouter un sous-traitant</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <SubcontractorFormFields
              form={form}
              vigilanceProof={vigilanceProof}
              insuranceProof={insuranceProof}
              onVigilanceProofChange={setVigilanceProof}
              onInsuranceProofChange={setInsuranceProof}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Ajout en cours..." : "Ajouter le sous-traitant"}
            </Button>
          </form>
        </Form>
      </div>
  );
};

export default SubcontractorForm;