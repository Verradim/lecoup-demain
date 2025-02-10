export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contracts: {
        Row: {
          company_address: string
          company_name: string
          created_at: string
          id: string
          is_full_project: boolean | null
          legal_representative_first_name: string
          legal_representative_last_name: string
          name: string
          profile_id: string
          project_id: string | null
          selected_work_descriptions: string[] | null
          siret: string
          status: string
          subcontractor_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_address: string
          company_name: string
          created_at?: string
          id?: string
          is_full_project?: boolean | null
          legal_representative_first_name: string
          legal_representative_last_name: string
          name: string
          profile_id: string
          project_id?: string | null
          selected_work_descriptions?: string[] | null
          siret: string
          status?: string
          subcontractor_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_address?: string
          company_name?: string
          created_at?: string
          id?: string
          is_full_project?: boolean | null
          legal_representative_first_name?: string
          legal_representative_last_name?: string
          name?: string
          profile_id?: string
          project_id?: string | null
          selected_work_descriptions?: string[] | null
          siret?: string
          status?: string
          subcontractor_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_subcontractor_id_fkey"
            columns: ["subcontractor_id"]
            isOneToOne: false
            referencedRelation: "subcontractors"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          company_description: string
          company_name: string
          company_status: string
          created_at: string
          discovery_source: string
          email: string
          employee_count: string
          full_name: string
          id: string
          instagram: string | null
          join_reason: string
          linkedin: string | null
          other_platform_is_member: string
          other_platform_name: string | null
          phone: string
          region: string
          sponsor: string
          terms_accepted: boolean
          website: string | null
        }
        Insert: {
          company_description: string
          company_name: string
          company_status: string
          created_at?: string
          discovery_source: string
          email: string
          employee_count: string
          full_name: string
          id?: string
          instagram?: string | null
          join_reason: string
          linkedin?: string | null
          other_platform_is_member: string
          other_platform_name?: string | null
          phone: string
          region: string
          sponsor: string
          terms_accepted: boolean
          website?: string | null
        }
        Update: {
          company_description?: string
          company_name?: string
          company_status?: string
          created_at?: string
          discovery_source?: string
          email?: string
          employee_count?: string
          full_name?: string
          id?: string
          instagram?: string | null
          join_reason?: string
          linkedin?: string | null
          other_platform_is_member?: string
          other_platform_name?: string | null
          phone?: string
          region?: string
          sponsor?: string
          terms_accepted?: boolean
          website?: string | null
        }
        Relationships: []
      }
      generated_contracts: {
        Row: {
          company_address: string
          company_name: string
          contract_id: string
          created_at: string
          email: string
          end_date: string | null
          generated_at: string
          id: string
          legal_representative_first_name: string
          legal_representative_last_name: string
          project_id: string | null
          siret: string
          start_date: string | null
          subcontractor_company_address: string | null
          subcontractor_company_name: string | null
          subcontractor_id: string | null
          subcontractor_legal_representative_first_name: string | null
          subcontractor_legal_representative_last_name: string | null
          subcontractor_siret: string | null
          user_id: string
          work_descriptions: string | null
          work_descriptions_id: string | null
          work_location: string | null
          work_title_id: string | null
          work_titles_description: string | null
        }
        Insert: {
          company_address: string
          company_name: string
          contract_id: string
          created_at?: string
          email: string
          end_date?: string | null
          generated_at?: string
          id?: string
          legal_representative_first_name: string
          legal_representative_last_name: string
          project_id?: string | null
          siret: string
          start_date?: string | null
          subcontractor_company_address?: string | null
          subcontractor_company_name?: string | null
          subcontractor_id?: string | null
          subcontractor_legal_representative_first_name?: string | null
          subcontractor_legal_representative_last_name?: string | null
          subcontractor_siret?: string | null
          user_id: string
          work_descriptions?: string | null
          work_descriptions_id?: string | null
          work_location?: string | null
          work_title_id?: string | null
          work_titles_description?: string | null
        }
        Update: {
          company_address?: string
          company_name?: string
          contract_id?: string
          created_at?: string
          email?: string
          end_date?: string | null
          generated_at?: string
          id?: string
          legal_representative_first_name?: string
          legal_representative_last_name?: string
          project_id?: string | null
          siret?: string
          start_date?: string | null
          subcontractor_company_address?: string | null
          subcontractor_company_name?: string | null
          subcontractor_id?: string | null
          subcontractor_legal_representative_first_name?: string | null
          subcontractor_legal_representative_last_name?: string | null
          subcontractor_siret?: string | null
          user_id?: string
          work_descriptions?: string | null
          work_descriptions_id?: string | null
          work_location?: string | null
          work_title_id?: string | null
          work_titles_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_contracts_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_contracts_subcontractor_id_fkey"
            columns: ["subcontractor_id"]
            isOneToOne: false
            referencedRelation: "subcontractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_contracts_work_descriptions_id_fkey"
            columns: ["work_descriptions_id"]
            isOneToOne: false
            referencedRelation: "work_descriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_contracts_work_title_id_fkey"
            columns: ["work_title_id"]
            isOneToOne: false
            referencedRelation: "work_titles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_address: string | null
          company_name: string | null
          completed: boolean | null
          created_at: string
          email: string
          id: string
          is_default: boolean | null
          legal_representative_first_name: string | null
          legal_representative_last_name: string | null
          parent_profile_id: string | null
          siret: string | null
          updated_at: string
        }
        Insert: {
          company_address?: string | null
          company_name?: string | null
          completed?: boolean | null
          created_at?: string
          email: string
          id: string
          is_default?: boolean | null
          legal_representative_first_name?: string | null
          legal_representative_last_name?: string | null
          parent_profile_id?: string | null
          siret?: string | null
          updated_at?: string
        }
        Update: {
          company_address?: string | null
          company_name?: string | null
          completed?: boolean | null
          created_at?: string
          email?: string
          id?: string
          is_default?: boolean | null
          legal_representative_first_name?: string | null
          legal_representative_last_name?: string | null
          parent_profile_id?: string | null
          siret?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_parent_profile_id_fkey"
            columns: ["parent_profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          quote_file_name: string | null
          quote_file_path: string | null
          start_date: string | null
          updated_at: string | null
          user_id: string
          work_location: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          quote_file_name?: string | null
          quote_file_path?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id: string
          work_location?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          quote_file_name?: string | null
          quote_file_path?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string
          work_location?: string | null
        }
        Relationships: []
      }
      propositions: {
        Row: {
          activity_sectors: string[]
          company_name: string
          company_type: string
          company_type_other: string | null
          completed: boolean
          contact_name: string
          created_at: string
          current_step: number
          email: string
          id: string
          phone: string
          siret: string
        }
        Insert: {
          activity_sectors: string[]
          company_name: string
          company_type: string
          company_type_other?: string | null
          completed?: boolean
          contact_name: string
          created_at?: string
          current_step?: number
          email: string
          id?: string
          phone: string
          siret: string
        }
        Update: {
          activity_sectors?: string[]
          company_name?: string
          company_type?: string
          company_type_other?: string | null
          completed?: boolean
          contact_name?: string
          created_at?: string
          current_step?: number
          email?: string
          id?: string
          phone?: string
          siret?: string
        }
        Relationships: []
      }
      subcontractors: {
        Row: {
          company_address: string
          company_name: string
          created_at: string
          id: string
          insurance_proof_name: string | null
          insurance_proof_path: string | null
          legal_representative_first_name: string
          legal_representative_last_name: string
          siret: string
          updated_at: string
          user_id: string
          vigilance_proof_name: string | null
          vigilance_proof_path: string | null
        }
        Insert: {
          company_address: string
          company_name: string
          created_at?: string
          id?: string
          insurance_proof_name?: string | null
          insurance_proof_path?: string | null
          legal_representative_first_name: string
          legal_representative_last_name: string
          siret: string
          updated_at?: string
          user_id: string
          vigilance_proof_name?: string | null
          vigilance_proof_path?: string | null
        }
        Update: {
          company_address?: string
          company_name?: string
          created_at?: string
          id?: string
          insurance_proof_name?: string | null
          insurance_proof_path?: string | null
          legal_representative_first_name?: string
          legal_representative_last_name?: string
          siret?: string
          updated_at?: string
          user_id?: string
          vigilance_proof_name?: string | null
          vigilance_proof_path?: string | null
        }
        Relationships: []
      }
      work_descriptions: {
        Row: {
          created_at: string
          description: string
          id: string
          updated_at: string
          work_title_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          updated_at?: string
          work_title_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          updated_at?: string
          work_title_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_descriptions_work_title_id_fkey"
            columns: ["work_title_id"]
            isOneToOne: false
            referencedRelation: "work_titles"
            referencedColumns: ["id"]
          },
        ]
      }
      work_titles: {
        Row: {
          created_at: string
          id: string
          project_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_titles_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
