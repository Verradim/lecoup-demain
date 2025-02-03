import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface ProfessionalInfoSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  website: z.string().optional(),
  region: z.string().min(1, "La région est requise"),
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
    </div>
  );
};