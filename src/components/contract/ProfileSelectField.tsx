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
import { Profile } from "@/types/profile";

interface ProfileSelectFieldProps {
  form: UseFormReturn<ContractFormValues>;
  profiles?: Profile[];
  onProfileChange: (profileId: string) => void;
}

export const ProfileSelectField = ({
  form,
  profiles,
  onProfileChange,
}: ProfileSelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="profile_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Donneur d'ordre</FormLabel>
          <Select onValueChange={onProfileChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un profil" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {profiles?.map((profile) => (
                <SelectItem key={profile.id} value={profile.id}>
                  {profile.company_name}
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