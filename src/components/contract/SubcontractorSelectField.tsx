import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { ContractFormValues } from "@/types/contract";
import { Tables } from "@/integrations/supabase/types";

type Subcontractor = Tables<"subcontractors">;

interface SubcontractorSelectFieldProps {
  form: UseFormReturn<ContractFormValues>;
  subcontractors?: Subcontractor[];
  onSubcontractorChange: (subcontractorId: string) => void;
}

export const SubcontractorSelectField = ({
  form,
  subcontractors,
  onSubcontractorChange,
}: SubcontractorSelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="subcontractor_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sous-traitant</FormLabel>
          <Select onValueChange={onSubcontractorChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un sous-traitant" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {subcontractors?.map((subcontractor) => (
                <SelectItem key={subcontractor.id} value={subcontractor.id}>
                  {subcontractor.company_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};