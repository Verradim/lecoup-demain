
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
import { profileFormSchema, type ProfileFormValues } from "@/types/profile";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const checkExistingProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        toast.error("Erreur lors de la vérification du profil");
        return;
      }

      if (data?.completed) {
        navigate("/mon-espace/profil");
      }
    };

    checkExistingProfile();
  }, [user, navigate]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un profil");
      return;
    }

    setIsSubmitting(true);
    try {
      let company_logo_url = null;
      let company_logo_name = null;

      // Upload logo if provided
      if (values.company_logo) {
        try {
          // Check if the logos bucket exists
          const { data: buckets, error: listError } = await supabase.storage.listBuckets();
          
          if (listError) {
            console.error("Error checking buckets:", listError);
            throw new Error("Impossible de vérifier le stockage");
          }
          
          const logosBucketExists = buckets?.some(bucket => bucket.name === 'logos');
          
          if (!logosBucketExists) {
            // Try to create the bucket
            const { error: createError } = await supabase.storage.createBucket('logos', {
              public: true,
              fileSizeLimit: 2097152,
              allowedMimeTypes: ['image/png', 'image/jpeg', 'image/svg+xml']
            });
            
            if (createError) {
              console.error("Error creating bucket:", createError);
              throw new Error("Impossible de créer l'espace de stockage pour les logos");
            }
          }
          
          const file = values.company_logo;
          const fileExt = file.name.split('.').pop();
          const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('logos')
            .upload(fileName, file);

          if (uploadError) {
            console.error("Upload error:", uploadError);
            throw uploadError;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('logos')
            .getPublicUrl(fileName);

          company_logo_url = publicUrl;
          company_logo_name = file.name;
        } catch (error: any) {
          console.error("Logo upload error:", error);
          throw new Error(`Erreur lors du téléchargement du logo: ${error.message}`);
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
          is_default: values.is_default,
          company_logo_url,
          company_logo_name,
          completed: true,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profil créé avec succès");
      navigate("/mon-espace/profil");
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
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Créer un nouveau profil</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CompanyInfoFields form={form} />
              <LogoUploadField form={form} />
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
                  {isSubmitting ? "Création..." : "Créer le profil"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
  );
};

export default ProfileForm;
