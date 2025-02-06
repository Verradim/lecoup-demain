export interface ContractsTable {
  Row: {
    company_address: string;
    company_name: string;
    created_at: string;
    id: string;
    is_full_project: boolean | null;
    legal_representative_first_name: string;
    legal_representative_last_name: string;
    name: string;
    profile_id: string;
    project_id: string | null;
    siret: string;
    status: string;
    subcontractor_id: string | null;
    updated_at: string;
    user_id: string;
  };
  Insert: {
    company_address: string;
    company_name: string;
    created_at?: string;
    id?: string;
    is_full_project?: boolean | null;
    legal_representative_first_name: string;
    legal_representative_last_name: string;
    name: string;
    profile_id: string;
    project_id?: string | null;
    siret: string;
    status?: string;
    subcontractor_id?: string | null;
    updated_at?: string;
    user_id: string;
  };
  Update: {
    company_address?: string;
    company_name?: string;
    created_at?: string;
    id?: string;
    is_full_project?: boolean | null;
    legal_representative_first_name?: string;
    legal_representative_last_name?: string;
    name?: string;
    profile_id?: string;
    project_id?: string | null;
    siret?: string;
    status?: string;
    subcontractor_id?: string | null;
    updated_at?: string;
    user_id?: string;
  };
}