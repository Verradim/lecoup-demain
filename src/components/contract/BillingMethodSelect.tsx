
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ContractFormValues, billingMethodOptions } from "@/types/contract";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BillingMethodSelectProps {
  form: UseFormReturn<ContractFormValues>;
}

export const BillingMethodSelect = ({ form }: BillingMethodSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="billing_method"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormLabel>Méthode de facturation</FormLabel>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Définissez les conditions de paiement de vos factures</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une méthode de facturation" />
              </SelectTrigger>
              <SelectContent>
                {billingMethodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
