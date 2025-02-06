import { ContractsTable } from './tables/contracts';
import { FormSubmissionsTable } from './tables/form-submissions';
import { ProfilesTable } from './tables/profiles';
import { ProjectsTable } from './tables/projects';
import { PropositionsTable } from './tables/propositions';
import { SubcontractorsTable } from './tables/subcontractors';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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