
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";

const profileFormSchema = z.object({
  siret: z
    .string()
    .min(14, "Le SIRET doit contenir 14 chiffres")
    .max(14, "Le SIRET doit contenir 14 chiffres")
    .regex(/^\d+$/, "Le SIRET ne doit contenir que des chiffres"),
  company_address: z.string().min(1, "L'adresse est requise"),
  company_name: z.string().min(1, "Le nom de l'entreprise est requis"),
  legal_representative_first_name: z.string().min(1, "Le prénom est requis"),
  legal_representative_last_name: z.string().min(1, "Le nom est requis"),
  is_default: z.boolean().default(false),
});

const ProfileForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
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

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un profil");
      return;
    }

    setIsSubmitting(true);
    try {
      // Si c'est défini comme profil par défaut, on retire d'abord le statut par défaut des autres profils
      if (values.is_default) {
        await supabase
          .from("profiles")
          .update({ is_default: false })
          .eq("parent_profile_id", user.id);
      }

      // Création du nouveau profil
      const { error } = await supabase.from("profiles").insert({
        id: user.id, // L'id du profil doit être l'id de l'utilisateur pour la première création
        email: user.email, // L'email est requis par le schéma
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
              <FormField
                control={form.control}
                name="siret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SIRET</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        maxLength={14}
                        placeholder="12345678901234"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length <= 14) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'entreprise</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nom de l'entreprise" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse complète de l'entreprise</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123 rue Example, 75000 Paris" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="legal_representative_first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom du représentant légal</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Prénom" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="legal_representative_last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du représentant légal</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nom" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="is_default"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Définir comme profil par défaut</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

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
