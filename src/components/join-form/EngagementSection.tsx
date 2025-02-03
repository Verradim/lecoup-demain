import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface EngagementSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les règles de la communauté",
  }),
});

export const EngagementSection = ({ form }: EngagementSectionProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                En cochant la case, vous avez pris connaissance des{" "}
                <a 
                  href="https://solar-gargoyle-286.notion.site/R-gles-de-la-communaut-CdM-181d8e05d6c9803f9401c9c076a3a3dd?pvs=74"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  règles de la communauté
                </a>{" "}
                et vous vous engagez à les respecter. *
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};