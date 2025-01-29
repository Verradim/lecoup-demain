import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface ProfessionalInfoSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  companyStatus: z.string().min(1, "Le statut de l'entreprise est requis"),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  instagram: z.string().optional(),
  website: z.string().optional(),
  region: z.string().min(1, "La région est requise"),
  companyDescription: z.string().min(1, "La description est requise"),
});

const regions = [
  "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne",
  "Centre-Val de Loire", "Corse", "Grand Est", "Hauts-de-France",
  "Île-de-France", "Normandie", "Nouvelle-Aquitaine",
  "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
];

export const ProfessionalInfoSection = ({ form }: ProfessionalInfoSectionProps) => {
  return (
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
  );
};