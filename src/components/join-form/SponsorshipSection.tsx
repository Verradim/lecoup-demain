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

interface SponsorshipSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  sponsor: z.string().min(1, "Le parrain est requis"),
});

export const SponsorshipSection = ({ form }: SponsorshipSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-primary">Parrainage</h3>
      <FormField
        control={form.control}
        name="sponsor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Je suis parrainé par *</FormLabel>
            <FormControl>
              <Input placeholder="Kylian Mbappé" className="bg-white" {...field} />
            </FormControl>
            <p className="text-sm text-muted-foreground">
              Si vous n'êtes pas recommandé par une personne de la communauté : {" "}
              <a href="#not-recommended" className="text-primary underline">
                cliquez-ici pour savoir comment rejoindre
              </a>
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};