
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProfileFormValues } from "@/types/profile";
import { FileUpload } from "@/components/subcontractor/FileUpload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LogoUploadFieldProps {
  form: UseFormReturn<ProfileFormValues>;
  currentLogoUrl?: string | null;
}

export const LogoUploadField = ({ form, currentLogoUrl }: LogoUploadFieldProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl || null);

  const handleFileChange = (file: File | null) => {
    form.setValue("company_logo", file);
    
    // Create a preview if file is selected
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(currentLogoUrl);
    }
  };

  return (
    <FormField
      control={form.control}
      name="company_logo"
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-full md:w-2/3">
              <FormLabel>Logo de l'entreprise (optionnel)</FormLabel>
              <FormDescription>
                En ajoutant votre logo, il sera affiché sur les contrats générés, rendant 
                vos documents plus professionnels et personnalisés.
              </FormDescription>
              <FormControl>
                <FileUpload
                  label=""
                  file={value as File | null}
                  onFileChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.svg"
                />
              </FormControl>
              <FormMessage />
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium mb-2">Prévisualisation</span>
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={previewUrl || ""} alt="Logo de l'entreprise" />
                <AvatarFallback className="text-xl">
                  {form.watch("company_name")?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
