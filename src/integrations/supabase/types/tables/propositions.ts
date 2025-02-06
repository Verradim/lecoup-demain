export interface PropositionsTable {
  Row: {
    id: string;
    created_at: string;
    company_name: string;
    contact_name: string;
    email: string;
    phone: string;
    siret: string;
    company_type: string;
    company_type_other: string | null;
    activity_sectors: string[];
    current_step: number;
    completed: boolean;
  };
  Insert: {
    id?: string;
    created_at?: string;
    company_name: string;
    contact_name: string;
    email: string;
    phone: string;
    siret: string;
    company_type: string;
    company_type_other?: string | null;
    activity_sectors: string[];
    current_step?: number;
    completed?: boolean;
  };
  Update: {
    id?: string;
    created_at?: string;
    company_name?: string;
    contact_name?: string;
    email?: string;
    phone?: string;
    siret?: string;
    company_type?: string;
    company_type_other?: string | null;
    activity_sectors?: string[];
    current_step?: number;
    completed?: boolean;
  };
}