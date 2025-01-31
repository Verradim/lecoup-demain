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
import { activitySectors } from "./formData";
import { useArtisanForm } from "./ArtisanFormContext";

export const ActivitySectorsSection = () => {
  const { form } = useArtisanForm();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="activity_sectors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Secteur d'activité</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  const currentValues = field.value || [];
                  const newValues = currentValues.includes(value)
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value];
                  field.onChange(newValues);
                }}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Sélectionnez vos secteurs d'activité" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {activitySectors.map((sector) => (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <div className="mt-2">
              {field.value?.map((sector) => (
                <span
                  key={sector}
                  className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm mr-2 mb-2"
                >
                  {activitySectors.find((s) => s.value === sector)?.label}
                </span>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};