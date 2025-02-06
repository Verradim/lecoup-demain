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
import { Project } from "@/pages/project-form/types";

interface ProjectSelectFieldProps {
  form: UseFormReturn<ContractFormValues>;
  projects?: Project[];
  onProjectChange: (projectId: string) => void;
}

export const ProjectSelectField = ({
  form,
  projects,
  onProjectChange,
}: ProjectSelectFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="project_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Chantier</FormLabel>
          <Select onValueChange={onProjectChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un chantier" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {projects?.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
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