export interface SubcontractorsTable {
  Row: {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    company_name: string;
    siret: string;
    company_address: string;
    legal_representative_first_name: string;
    legal_representative_last_name: string;
    vigilance_proof_path: string | null;
    vigilance_proof_name: string | null;
    insurance_proof_path: string | null;
    insurance_proof_name: string | null;
  };
  Insert: {
    id?: string;
    created_at?: string;
    updated_at?: string;
    user_id: string;
    company_name: string;
    siret: string;
    company_address: string;
    legal_representative_first_name: string;
    legal_representative_last_name: string;
    vigilance_proof_path?: string | null;
    vigilance_proof_name?: string | null;
    insurance_proof_path?: string | null;
    insurance_proof_name?: string | null;
  };
  Update: {
    id?: string;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
    company_name?: string;
    siret?: string;
    company_address?: string;
    legal_representative_first_name?: string;
    legal_representative_last_name?: string;
    vigilance_proof_path?: string | null;
    vigilance_proof_name?: string | null;
    insurance_proof_path?: string | null;
    insurance_proof_name?: string | null;
  };
}