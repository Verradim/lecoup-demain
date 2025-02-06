import { Json } from '../database';

export interface ProjectsTable {
  Row: {
    id: string;
    created_at: string;
    name: string;
    user_id: string;
    quote_file_path: string | null;
    quote_file_name: string | null;
    work_location: string | null;
    start_date: string | null;
    end_date: string | null;
    updated_at: string | null;
    work_titles: Json[] | null;
    description: string | null;
  };
  Insert: {
    id?: string;
    created_at?: string;
    name: string;
    user_id: string;
    quote_file_path?: string | null;
    quote_file_name?: string | null;
    work_location?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    updated_at?: string | null;
    work_titles?: Json[] | null;
    description?: string | null;
  };
  Update: {
    id?: string;
    created_at?: string;
    name?: string;
    user_id?: string;
    quote_file_path?: string | null;
    quote_file_name?: string | null;
    work_location?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    updated_at?: string | null;
    work_titles?: Json[] | null;
    description?: string | null;
  };
}