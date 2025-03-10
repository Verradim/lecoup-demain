import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyInfoFields } from "@/components/profile/CompanyInfoFields";
import { LegalRepresentativeFields } from "@/components/profile/LegalRepresentativeFields";
import { LogoUploadField } from "@/components/profile/LogoUploadField";
import { profileFormSchema, type ProfileFormValues, type Profile } from "@/types/profile";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      siret: "",
      company_address: "",
      company_name: "",
      legal_representative_first_name: "",
      legal_representative_last_name: "",
      phone: "",
      is_default: false,
      company_logo: null,
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
          navigate("/mon-espace/profil");
          return;
        }

        setProfile(data as Profile);

        form.reset({
          siret: data.siret || "",
          company_address: data.company_address || "",
          company_name: data.company_name || "",
          legal_representative_first_name: data.legal_representative_first_name || "",
          legal_representative_last_name: data.legal_representative_last_name || "",
          phone: data.phone || "",
          is_default: false,
          company_logo: null,
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
      let company_logo_url = profile?.company_logo_url;
      let company_logo_name = profile?.company_logo_name;

      if (values.company_logo) {
        try {
          const file = values.company_logo;
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
          
          console.log("Attempting to upload file:", fileName);
          
          const { error: uploadError } = await supabase.storage
            .from('Logo')
            .upload(fileName, file, {
              upsert: true,
              contentType: file.type,
            });

          if (uploadError) {
            console.error("Upload error:", uploadError);
            throw new Error(`Erreur lors de l'upload: ${uploadError.message}`);
          }

          // Get the public URL after successful upload
          const { data: { publicUrl } } = supabase.storage
            .from('Logo')
            .getPublicUrl(fileName);

          company_logo_url = publicUrl;
          company_logo_name = file.name;
          console.log("File uploaded successfully. Public URL:", publicUrl);
        } catch (error: any) {
          console.error("Logo upload error:", error);
          throw new Error(`Problème lors du téléchargement du logo: ${error.message}`);
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          siret: values.siret,
          company_address: values.company_address,
          company_name: values.company_name,
          legal_representative_first_name: values.legal_representative_first_name,
          legal_representative_last_name: values.legal_representative_last_name,
          phone: values.phone,
          company_logo_url,
          company_logo_name,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profil mis à jour avec succès");
      navigate("/mon-espace/profil");
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
      <div className="container py-8">
        <div className="text-center">Chargement du profil...</div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Modifier mon profil</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CompanyInfoFields form={form} />
            <LogoUploadField 
              form={form} 
              currentLogoUrl={profile?.company_logo_url || null} 
            />
            <LegalRepresentativeFields form={form} />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/mon-espace/profil")}
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
  );
};

export default ProfileEdit;
