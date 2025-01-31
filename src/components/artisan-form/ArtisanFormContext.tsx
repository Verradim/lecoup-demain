import { createContext, useContext, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  company_name: z.string().min(1, "Le nom de l'entreprise est requis"),
  contact_name: z.string().min(1, "Le nom et prénom du contact sont requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  siret: z.string().length(14, "Le SIRET doit contenir 14 chiffres"),
  company_type: z.string().min(1, "Le type d'entreprise est requis"),
  company_type_other: z.string().optional(),
  activity_sectors: z.array(z.string()).min(1, "Sélectionnez au moins un secteur d'activité"),
});

export type FormValues = z.infer<typeof formSchema>;

type ArtisanFormContextType = {
  form: UseFormReturn<FormValues>;
  isSubmitting: boolean;
};

const ArtisanFormContext = createContext<ArtisanFormContextType | undefined>(undefined);

export const useArtisanForm = () => {
  const context = useContext(ArtisanFormContext);
  if (!context) {
    throw new Error("useArtisanForm must be used within an ArtisanFormProvider");
  }
  return context;
};

export const ArtisanFormProvider = ({ 
  children, 
  form, 
  isSubmitting 
}: { 
  children: ReactNode;
  form: UseFormReturn<FormValues>;
  isSubmitting: boolean;
}) => {
  return (
    <ArtisanFormContext.Provider value={{ form, isSubmitting }}>
      {children}
    </ArtisanFormContext.Provider>
  );
};