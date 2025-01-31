import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Textarea } from "@/components/ui/textarea";
import { companyTypes } from "./formData";
import { useArtisanForm } from "./ArtisanFormContext";

export const CompanySection = () => {
  const { form } = useArtisanForm();
  const showOtherField = form.watch("company_type") === "autre";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary">Informations de l'entreprise</h2>
      <FormField
        control={form.control}
        name="company_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de l'entreprise</FormLabel>
            <FormControl>
              <Input className="bg-white" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type d'entreprise</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Sélectionnez le type d'entreprise" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                {companyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {showOtherField && (
        <FormField
          control={form.control}
          name="company_type_other"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Précisez le type d'entreprise</FormLabel>
              <FormControl>
                <Textarea className="bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};