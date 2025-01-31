import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReassuranceTexts } from "./ReassuranceTexts";
import { companyTypes, activitySectors } from "./formData";

const formSchema = z.object({
  company_name: z.string().min(1, "Le nom de l'entreprise est requis"),
  contact_name: z.string().min(1, "Le nom et prénom du contact sont requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  siret: z.string().length(14, "Le SIRET doit contenir 14 chiffres"),
  company_type: z.string().min(1, "Le type d'entreprise est requis"),
  company_type_other: z.string().optional(),
  activity_sectors: z.array(z.string()).min(1, "Sélectionnez au moins un secteur d'activité"),
});

export const ArtisanForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      contact_name: "",
      email: "",
      phone: "",
      siret: "",
      company_type: "",
      activity_sectors: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("propositions")
        .insert({
          ...values,
          current_step: 1,
        });

      if (error) throw error;

      toast.success("Vos informations ont été enregistrées");
      setSearchParams({ page: "2" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showOtherField = form.watch("company_type") === "autre";

  return (
    <div className="space-y-8">
      <ReassuranceTexts />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            name="contact_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom et prénom du contact</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="company_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d'entreprise</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le type d'entreprise" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {showOtherField && (
            <FormField
              control={form.control}
              name="company_type_other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Précisez le type d'entreprise</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="activity_sectors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secteur d'activité</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      const currentValues = field.value || [];
                      const newValues = currentValues.includes(value)
                        ? currentValues.filter((v) => v !== value)
                        : [...currentValues, value];
                      field.onChange(newValues);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez vos secteurs d'activité" />
                    </SelectTrigger>
                    <SelectContent>
                      {activitySectors.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="mt-2">
                  {field.value?.map((sector) => (
                    <span
                      key={sector}
                      className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm mr-2 mb-2"
                    >
                      {activitySectors.find((s) => s.value === sector)?.label}
                    </span>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : "Continuer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};