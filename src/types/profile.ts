import * as z from "zod";

export const profileFormSchema = z.object({
  siret: z
    .string()
    .min(14, "Le SIRET doit contenir 14 chiffres")
    .max(14, "Le SIRET doit contenir 14 chiffres")
    .regex(/^\d+$/, "Le SIRET ne doit contenir que des chiffres"),
  company_address: z.string().min(1, "L'adresse est requise"),
  company_name: z.string().min(1, "Le nom de l'entreprise est requis"),
  legal_representative_first_name: z.string().min(1, "Le prénom est requis"),
  legal_representative_last_name: z.string().min(1, "Le nom est requis"),
  is_default: z.boolean().default(false),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export interface Profile {
  id: string;
  created_at: string;
  email: string;
  updated_at: string;
  siret: string | null;
  company_address: string | null;
  company_name: string | null;
  legal_representative_first_name: string | null;
  legal_representative_last_name: string | null;
  is_default: boolean | null;
  parent_profile_id: string | null;
  completed: boolean | null;
}