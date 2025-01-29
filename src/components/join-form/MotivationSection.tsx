import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
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

interface MotivationSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  discoverySource: z.string().min(1, "La source est requise"),
  joinReason: z.string().min(1, "La raison est requise"),
});

export const MotivationSection = ({ form }: MotivationSectionProps) => {
  return (
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
    </div>
  );
};