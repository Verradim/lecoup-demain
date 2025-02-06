export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contracts: ContractsTable;
      form_submissions: FormSubmissionsTable;
      profiles: ProfilesTable;
      projects: ProjectsTable;
      propositions: PropositionsTable;
      subcontractors: SubcontractorsTable;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}