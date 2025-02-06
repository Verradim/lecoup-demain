import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ContractFormValues } from "@/types/contract";

interface ContractNameFieldProps {
  form: UseFormReturn<ContractFormValues>;
}

export const ContractNameField = ({ form }: ContractNameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom du contrat</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Nom du contrat" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};