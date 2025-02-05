
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
import { CompanyInfoFields } from "@/components/profile/CompanyInfoFields";
import { LegalRepresentativeFields } from "@/components/profile/LegalRepresentativeFields";
import { profileFormSchema, type ProfileFormValues } from "@/types/profile";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          toast.error("Profil introuvable");
          navigate("/projets/profil");
          return;
        }

        // Set form values
        form.reset({
          siret: data.siret || "",
          company_address: data.company_address || "",
          company_name: data.company_name || "",
          legal_representative_first_name: data.legal_representative_first_name || "",
          legal_representative_last_name: data.legal_representative_last_name || "",
          is_default: false,
        });
      } catch (error: any) {
        toast.error("Erreur lors du chargement du profil : " + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, navigate, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast.error("Vous devez être connecté pour modifier votre profil");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          siret: values.siret,
          company_address: values.company_address,
          company_name: values.company_name,
          legal_representative_first_name: values.legal_representative_first_name,
          legal_representative_last_name: values.legal_representative_last_name,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profil mis à jour avec succès");
      navigate("/projets/profil");
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour du profil : " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (loading) {
    return (
      <Layout
        title="Modification du profil - Le Coup de Main"
        description="Modifier mon profil - Le Coup de Main"
        canonicalUrl="https://lecoup-demain.com/projets/profil/modifier"
      >
        <div className="container py-8">
          <div className="text-center">Chargement du profil...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Modification du profil - Le Coup de Main"
      description="Modifier mon profil - Le Coup de Main"
      canonicalUrl="https://lecoup-demain.com/projets/profil/modifier"
    >
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Modifier mon profil</h1>

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
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileEdit;
