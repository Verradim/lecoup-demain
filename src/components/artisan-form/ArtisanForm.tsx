import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ReassuranceTexts } from "./ReassuranceTexts";
import { CompanySection } from "./CompanySection";
import { ContactSection } from "./ContactSection";
import { ActivitySectorsSection } from "./ActivitySectorsSection";
import { ArtisanFormProvider, formSchema, type FormValues } from "./ArtisanFormContext";

export const ArtisanForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      contact_name: "",
      email: "",
      phone: "",
      siret: "",
      company_type: "",
      company_type_other: "",
      activity_sectors: [],
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("propositions")
        .insert({
          ...values,
          current_step: 1,
          completed: false,
        } as any); // Using type assertion here as a temporary fix

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

  return (
    <div className="space-y-8">
      <ReassuranceTexts />
      <ArtisanFormProvider form={form} isSubmitting={isSubmitting}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CompanySection />
            <ContactSection />
            <ActivitySectorsSection />
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Continuer"}
            </Button>
          </form>
        </Form>
      </ArtisanFormProvider>
    </div>
  );
};