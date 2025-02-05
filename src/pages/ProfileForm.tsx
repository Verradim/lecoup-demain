
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { CompanyInfoFields } from "@/components/profile/CompanyInfoFields";
import { LegalRepresentativeFields } from "@/components/profile/LegalRepresentativeFields";
import { profileFormSchema, type ProfileFormValues } from "@/types/profile";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("parent_profile_id", user.id)
        .single();

      if (data) {
        toast.error("Vous avez déjà créé un profil");
        navigate("/projets/profil");
      }
    };

    checkExistingProfile();
  }, [user, navigate]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      siret: "",
      company_address: "",
      company_name: "",
      legal_representative_first_name: "",
      legal_representative_last_name: "",
      is_default: false,
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un profil");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        siret: values.siret,
        company_address: values.company_address,
        company_name: values.company_name,
        legal_representative_first_name: values.legal_representative_first_name,
        legal_representative_last_name: values.legal_representative_last_name,
        is_default: values.is_default,
        parent_profile_id: user.id,
      });

      if (error) throw error;

      toast.success("Profil créé avec succès");
      navigate("/projets/profil");
    } catch (error: any) {
      toast.error("Erreur lors de la création du profil : " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <Layout
      title="Nouveau profil - Le Coup de Main"
      description="Créer un nouveau profil - Le Coup de Main"
      canonicalUrl="https://lecoup-demain.com/projets/profil/nouveau"
    >
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Créer un nouveau profil</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CompanyInfoFields form={form} />
              <LegalRepresentativeFields form={form} />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/projets/profil")}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Création..." : "Créer le profil"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileForm;
