import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const contractFormSchema = z.object({
  name: z.string().min(1, "Le nom du contrat est requis"),
  profile_id: z.string().min(1, "Le profil est requis"),
  legal_representative_first_name: z.string().min(1, "Le prénom est requis"),
  legal_representative_last_name: z.string().min(1, "Le nom est requis"),
  siret: z.string().min(14, "Le SIRET doit contenir 14 chiffres").max(14),
  company_name: z.string().min(1, "Le nom de l'entreprise est requis"),
  company_address: z.string().min(1, "L'adresse est requise"),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

interface Profile {
  id: string;
  company_name: string;
  siret: string;
  legal_representative_first_name: string;
  legal_representative_last_name: string;
  company_address: string;
}

const ContractForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      name: "",
      profile_id: "",
      legal_representative_first_name: "",
      legal_representative_last_name: "",
      siret: "",
      company_name: "",
      company_address: "",
    },
  });

  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("completed", true);

      if (error) throw error;
      return data as Profile[];
    },
  });

  const onSubmit = async (values: ContractFormValues) => {
    try {
      const { error } = await supabase.from("contracts").insert({
        ...values,
        user_id: user?.id,
        status: "draft",
      });

      if (error) throw error;

      toast.success("Contrat créé avec succès");
      navigate("/mon-espace/contrats");
    } catch (error: any) {
      toast.error("Erreur lors de la création du contrat: " + error.message);
    }
  };

  const handleProfileChange = (profileId: string) => {
    const selectedProfile = profiles?.find((p) => p.id === profileId);
    if (selectedProfile) {
      form.setValue("profile_id", profileId);
      form.setValue(
        "legal_representative_first_name",
        selectedProfile.legal_representative_first_name
      );
      form.setValue(
        "legal_representative_last_name",
        selectedProfile.legal_representative_last_name
      );
      form.setValue("siret", selectedProfile.siret);
      form.setValue("company_name", selectedProfile.company_name);
      form.setValue("company_address", selectedProfile.company_address);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Créer un nouveau contrat</h1>
        <p className="text-muted-foreground mt-1">
          Remplissez les informations ci-dessous pour créer un nouveau contrat
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du contrat</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nom du contrat" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profile_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Donneur d'ordre</FormLabel>
                <Select
                  onValueChange={(value) => handleProfileChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un profil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {profiles?.map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.company_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="legal_representative_first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom du représentant légal</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="siret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SIRET</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                <FormLabel>Adresse de l'entreprise</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/mon-espace/contrats")}
            >
              Annuler
            </Button>
            <Button type="submit">Créer le contrat</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContractForm;