import { z } from "zod";

export const contractFormSchema = z.object({
  name: z.string().min(1, "Le nom du contrat est requis"),
  profile_id: z.string().min(1, "Le profil est requis"),
  legal_representative_first_name: z.string().min(1, "Le prénom est requis"),
  legal_representative_last_name: z.string().min(1, "Le nom est requis"),
  siret: z.string().min(14, "Le SIRET doit contenir 14 chiffres").max(14),
  company_name: z.string().min(1, "Le nom de l'entreprise est requis"),
  company_address: z.string().min(1, "L'adresse est requise"),
});

export type ContractFormValues = z.infer<typeof contractFormSchema>;

export interface Contract {
  id: string;
  name: string;
  status: string;
  company_name: string;
  created_at: string;
}