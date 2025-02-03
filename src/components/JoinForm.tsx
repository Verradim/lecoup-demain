import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { SponsorshipSection } from "./join-form/SponsorshipSection";
import { PersonalInfoSection } from "./join-form/PersonalInfoSection";
import { ProfessionalInfoSection } from "./join-form/ProfessionalInfoSection";
import { EngagementSection } from "./join-form/EngagementSection";
import { SuccessDialog } from "./join-form/SuccessDialog";

const formSchema = z.object({
  sponsor: z.string().min(1, "Le parrain est requis"),
  fullName: z.string().min(1, "Le nom et prénom sont requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  website: z.string().optional(),
  region: z.string().min(1, "La région est requise"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les règles de la communauté",
  }),
});

export const JoinForm = () => {
  const { toast } = useToast();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sponsor: "",
      fullName: "",
      phone: "",
      email: "",
      companyName: "",
      website: "",
      region: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .insert([
          {
            sponsor: values.sponsor,
            full_name: values.fullName,
            phone: values.phone,
            email: values.email,
            linkedin: null,
            company_status: "N/A",
            company_name: values.companyName,
            instagram: null,
            website: values.website,
            region: values.region,
            company_description: "N/A",
            discovery_source: "N/A",
            join_reason: "N/A",
            terms_accepted: values.termsAccepted,
            employee_count: "N/A",
            other_platform_is_member: "N/A",
            other_platform_name: null,
          }
        ])
        .select();

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
        });
        return;
      }

      const { error: functionError } = await supabase.functions.invoke('send-form-notification', {
        body: { record: data[0] }
      });

      if (functionError) {
        console.error('Error sending notification:', functionError);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Votre candidature a été enregistrée mais nous n'avons pas pu vous envoyer l'email de confirmation.",
        });
        return;
      }

      setShowSuccessDialog(true);
      form.reset();
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
      });
    }
  };

  return (
    <>
      <SuccessDialog 
        open={showSuccessDialog} 
        onOpenChange={setShowSuccessDialog}
      />

      <section id="join-form" className="py-20 px-4 bg-background">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
            Rejoindre la communauté
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <SponsorshipSection form={form} />
              <PersonalInfoSection form={form} />
              <ProfessionalInfoSection form={form} />
              <EngagementSection form={form} />

              <Button type="submit" className="w-full text-white">
                Envoyer ma candidature
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default JoinForm;