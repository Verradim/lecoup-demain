
import * as z from "zod";

export const contractFormSchema = z.object({
  name: z.string().min(1, "Le nom du contrat est requis"),
  profile_id: z.string().min(1, "Le donneur d'ordre est requis"),
  subcontractor_id: z.string().min(1, "Le sous-traitant est requis"),
  legal_representative_first_name: z.string().min(1, "Le prénom est requis"),
  legal_representative_last_name: z.string().min(1, "Le nom est requis"),
  siret: z.string().min(1, "Le SIRET est requis"),
  company_name: z.string().min(1, "Le nom de l'entreprise est requis"),
  company_address: z.string().min(1, "L'adresse est requise"),
  project_id: z.string().optional(),
  is_full_project: z.boolean().optional(),
  selected_work_descriptions: z.array(z.string()).optional(),
  payment_milestones: z.array(z.object({
    id: z.string().optional(),
    description: z.string(),
    percentage: z.number(),
    milestone_date: z.string().optional(),
    milestone_type: z.enum(['signature', 'start', 'end', 'custom']),
    order_index: z.number()
  })),
  billing_method: z.enum([
    'À réception de facture (paiement immédiat)',
    '15 jours - date de facture',
    '30 jours - date de facture',
    '30 jours - fin de mois',
    '45 jours - fin de mois',
    '60 jours - fin de mois'
  ], {
    required_error: "Veuillez sélectionner une méthode de facturation"
  })
});

export type ContractFormValues = z.infer<typeof contractFormSchema>;

export type PaymentMilestone = {
  id?: string;
  description: string;
  percentage: number;
  milestone_date?: string | null;
  milestone_type: 'signature' | 'start' | 'end' | 'custom';
  order_index: number;
};

export const billingMethodOptions = [
  { value: 'À réception de facture (paiement immédiat)', label: 'À réception de facture (paiement immédiat)' },
  { value: '15 jours - date de facture', label: '15 jours - date de facture' },
  { value: '30 jours - date de facture', label: '30 jours - date de facture' },
  { value: '30 jours - fin de mois', label: '30 jours - fin de mois' },
  { value: '45 jours - fin de mois', label: '45 jours - fin de mois' },
  { value: '60 jours - fin de mois', label: '60 jours - fin de mois' }
];
