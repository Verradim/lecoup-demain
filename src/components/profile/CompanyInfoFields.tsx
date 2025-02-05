
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

interface CompanyInfoFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const CompanyInfoFields = ({ form }: CompanyInfoFieldsProps) => {
  return (
    <>
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
                placeholder="12345678901234"
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
        name="company_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de l'entreprise</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nom de l'entreprise" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company_address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse complète de l'entreprise</FormLabel>
            <FormControl>
              <Input {...field} placeholder="123 rue Example, 75000 Paris" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
