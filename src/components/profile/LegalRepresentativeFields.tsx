
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/types/profile";

interface LegalRepresentativeFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const LegalRepresentativeFields = ({ form }: LegalRepresentativeFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="legal_representative_first_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prénom du représentant légal</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Prénom" />
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
              <Input {...field} placeholder="Nom" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
