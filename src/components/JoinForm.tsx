import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  sponsor: z.string().min(1, "Le parrain est requis"),
  fullName: z.string().min(1, "Le nom et prénom sont requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  linkedin: z.string().optional(),
  companyStatus: z.string().min(1, "Le statut de l'entreprise est requis"),
  employeeCount: z.string().min(1, "Le nombre de salariés est requis"),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  instagram: z.string().optional(),
  website: z.string().optional(),
  region: z.string().min(1, "La région est requise"),
  companyDescription: z.string().min(1, "La description est requise"),
  discoverySource: z.string().min(1, "La source est requise"),
  joinReason: z.string().min(1, "La raison est requise"),
  otherPlatform: z.object({
    isMember: z.string().min(1, "Ce champ est requis"),
    platformName: z.string().optional(),
  }),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sponsor: "",
      fullName: "",
      phone: "",
      email: "",
      linkedin: "",
      companyStatus: "",
      employeeCount: "",
      companyName: "",
      instagram: "",
      website: "",
      region: "",
      companyDescription: "",
      discoverySource: "",
      joinReason: "",
      otherPlatform: {
        isMember: "",
        platformName: "",
      },
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([
          {
            sponsor: values.sponsor,
            full_name: values.fullName,
            phone: values.phone,
            email: values.email,
            linkedin: values.linkedin,
            company_status: values.companyStatus,
            employee_count: values.employeeCount,
            company_name: values.companyName,
            instagram: values.instagram,
            website: values.website,
            region: values.region,
            company_description: values.companyDescription,
            discovery_source: values.discoverySource,
            join_reason: values.joinReason,
            other_platform_is_member: values.otherPlatform.isMember,
            other_platform_name: values.otherPlatform.platformName,
            terms_accepted: values.termsAccepted,
          }
        ]);

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.",
        });
      } else {
        toast({
          title: "Succès",
          description: "Votre candidature a été envoyée avec succès !",
        });
        form.reset();
      }
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
                        <SelectItem value="independent">Artisan Indépendant</SelectItem>
                        <SelectItem value="small">Entreprise (moins de 5 salariés)</SelectItem>
                        <SelectItem value="medium">Entreprise (5-10 salariés)</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Combien de salariés avez-vous *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Sélectionnez le nombre de salariés" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1-3">Entre 1 et 3</SelectItem>
                        <SelectItem value="3-9">Entre 3 et 9</SelectItem>
                        <SelectItem value="10+">Plus de 10</SelectItem>
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
              <FormField
                control={form.control}
                name="otherPlatform.isMember"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Êtes-vous déjà membre d'une autre plateforme ? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Non
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Oui
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("otherPlatform.isMember") === "yes" && (
                <FormField
                  control={form.control}
                  name="otherPlatform.platformName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Précisez laquelle *</FormLabel>
                      <FormControl>
                        <Input placeholder="Yoojo, Travaux.com,..." className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
  );
