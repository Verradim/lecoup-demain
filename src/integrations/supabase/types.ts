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
      profiles: {
        Row: {
          company_address: string | null
          company_name: string | null
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
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          user_id?: string
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
