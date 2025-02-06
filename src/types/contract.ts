import * as z from "zod";

export const contractFormSchema = z.object({
  name: z.string().min(1, "Le nom du contrat est requis"),
  profile_id: z.string().min(1, "Le donneur d'ordre est requis"),
  subcontractor_id: z.string().min(1, "Le sous-traitant est requis"),
  legal_representative_first_name: z.string(),
  legal_representative_last_name: z.string(),
  siret: z.string(),
  company_name: z.string(),
  company_address: z.string(),
  project_id: z.string().optional(),
  is_full_project: z.boolean().optional(),
});

export type ContractFormValues = z.infer<typeof contractFormSchema>;