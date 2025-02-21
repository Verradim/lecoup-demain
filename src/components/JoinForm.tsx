
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { PersonalInfoSection } from "./join-form/PersonalInfoSection";
import { MessageSection } from "./join-form/MessageSection";
import { SuccessDialog } from "./join-form/SuccessDialog";

const formSchema = z.object({
  fullName: z.string().min(1, "Le nom et prénom sont requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  message: z.string().optional(),
});

export const JoinForm = () => {
  const { toast } = useToast();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      companyName: "",
      message: "Bonjour ! Je suis intéressé par vos services, possible de s'appeler pour en discuter ? 😀",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .insert({
          full_name: values.fullName,
          phone: values.phone,
          email: values.email,
          company_name: values.companyName,
          message: values.message,
          // Ajout des champs requis avec des valeurs par défaut pour les champs optionnels
          sponsor: 'N/A',
          company_status: 'N/A',
          employee_count: 'N/A',
          company_description: 'N/A',
          discovery_source: 'N/A',
          join_reason: 'N/A',
          other_platform_is_member: 'N/A',
          terms_accepted: true
        })
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
          description: "Votre message a été enregistré mais nous n'avons pas pu vous envoyer l'email de confirmation.",
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
            Nous contacter
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <PersonalInfoSection form={form} />
              <MessageSection form={form} />

              <Button type="submit" className="w-full text-white">
                Envoyer
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default JoinForm;
