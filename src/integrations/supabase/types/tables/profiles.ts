export interface ProfilesTable {
  Row: {
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
  };
  Insert: {
    id: string;
    created_at?: string;
    email: string;
    updated_at?: string;
    siret?: string | null;
    company_address?: string | null;
    company_name?: string | null;
    legal_representative_first_name?: string | null;
    legal_representative_last_name?: string | null;
    is_default?: boolean | null;
    parent_profile_id?: string | null;
    completed?: boolean | null;
  };
  Update: {
    id?: string;
    created_at?: string;
    email?: string;
    updated_at?: string;
    siret?: string | null;
    company_address?: string | null;
    company_name?: string | null;
    legal_representative_first_name?: string | null;
    legal_representative_last_name?: string | null;
    is_default?: boolean | null;
    parent_profile_id?: string | null;
    completed?: boolean | null;
  };
}