import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const formSchema = z.object({
  sponsor: z.string().min(1, "Le parrain est requis"),
  fullName: z.string().min(1, "Le nom et prénom sont requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  linkedin: z.string().optional(),
  companyStatus: z.string().min(1, "Le statut de l'entreprise est requis"),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  instagram: z.string().optional(),
  website: z.string().optional(),
  region: z.string().min(1, "La région est requise"),
  companyDescription: z.string().min(1, "La description est requise"),
  discoverySource: z.string().min(1, "La source est requise"),
  joinReason: z.string().min(1, "La raison est requise"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les règles de la communauté",
  }),
});

const regions = [
  "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne",
  "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France",
  "Île-de-France", "Normandie", "Nouvelle-Aquitaine",
  "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
];

export const JoinForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sponsor: "",
      fullName: "",
      phone: "",
      email: "",
      linkedin: "",
      companyStatus: "",
      companyName: "",
      instagram: "",
      website: "",
      region: "",
      companyDescription: "",
      discoverySource: "",
      joinReason: "",
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
            linkedin: values.linkedin,
            company_status: values.companyStatus,
            company_name: values.companyName,
            instagram: values.instagram,
            website: values.website,
            region: values.region,
            company_description: values.companyDescription,
            discovery_source: values.discoverySource,
            join_reason: values.joinReason,
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
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Merci d'avoir candidaté pour rejoindre Le Coup de Main, la communauté dédiée aux artisans indépendants et aux entreprises du bâtiment. 🙌
            </DialogTitle>
            <DialogDescription className="text-center pt-4">
              Vous allez recevoir un e-mail de confirmation détaillant les prochaines étapes
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              type="button"
              onClick={() => {
                setShowSuccessDialog(false);
                navigate("/");
              }}
              className="w-full sm:w-auto"
            >
              J'ai compris
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section id="join-form" className="py-20 px-4 bg-background">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
            Rejoindre la communauté
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              {/* Parrainage */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Parrainage</h3>
                <FormField
                  control={form.control}
                  name="sponsor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Je suis parrainé par *</FormLabel>
                      <FormControl>
                        <Input placeholder="Kylian Mbappé" className="bg-white" {...field} />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        Si vous n'êtes pas recommandé par une personne de la communauté : {" "}
                        <a href="#not-recommended" className="text-primary underline">
                          cliquez-ici pour savoir comment rejoindre
                        </a>
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Informations personnelles */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Informations personnelles</h3>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom et prénom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Didier Deschamps" className="bg-white" {...field} />
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
                      <FormLabel>Numéro de téléphone *</FormLabel>
                      <FormControl>
                        <Input placeholder="0600102030" className="bg-white" {...field} />
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
                      <FormLabel>Adresse e-mail *</FormLabel>
                      <FormControl>
                        <Input placeholder="didierdeschamps@gmail.com" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="Copiez-collez le lien suivant" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Informations professionnelles */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Informations professionnelles</h3>
                <FormField
                  control={form.control}
                  name="companyStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut de l'entreprise *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Sélectionnez votre statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="independent">Artisan indépendant (Auto-entrepreneur, EI, EURL…)</SelectItem>
                          <SelectItem value="small">TPE – Petite entreprise (1 à 4 salariés)</SelectItem>
                          <SelectItem value="medium">PME – Entreprise de taille moyenne (5 à 10 salariés)</SelectItem>
                          <SelectItem value="large">Entreprise générale du bâtiment (Plus de 10 salariés)</SelectItem>
                          <SelectItem value="other">Autre (à préciser)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'entreprise *</FormLabel>
                      <FormControl>
                        <Input className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="Copiez-collez le lien suivant" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site internet</FormLabel>
                      <FormControl>
                        <Input placeholder="Copiez-collez le lien suivant" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Région d'activité *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Sélectionnez votre région" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white z-50">
                          {regions.map((region) => (
                            <SelectItem key={region} value={region.toLowerCase()}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description de l'activité de l'entreprise *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Travaux de plomberie" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Motivations */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Motivations</h3>
                <FormField
                  control={form.control}
                  name="discoverySource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment avez-vous connu notre existence ? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Sélectionnez une option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white z-50">
                          <SelectItem value="social">Réseaux sociaux</SelectItem>
                          <SelectItem value="search">Référencement (moteur de recherche)</SelectItem>
                          <SelectItem value="word">Bouche-à-oreille</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="joinReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pourquoi souhaitez-vous rejoindre la communauté ? *</FormLabel>
                      <FormControl>
                        <Textarea className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Engagement */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary">Votre engagement</h3>
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          En cochant la case, vous avez pris connaissance des{" "}
                          <a 
                            href="https://solar-gargoyle-286.notion.site/R-gles-de-la-communaut-CdM-181d8e05d6c9803f9401c9c076a3a3dd?pvs=74"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            règles de la communauté
                          </a>{" "}
                          et vous vous engagez à les respecter. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

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