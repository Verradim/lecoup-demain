import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface PersonalInfoSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  fullName: z.string().min(1, "Le nom et prénom sont requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
});

export const PersonalInfoSection = ({ form }: PersonalInfoSectionProps) => {
  return (
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
    </div>
  );
};