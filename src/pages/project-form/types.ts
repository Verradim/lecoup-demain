
export interface WorkTitle {
  title: string;
  descriptions: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  work_location: string | null;
  start_date: string | null;
  end_date: string | null;
  quote_file_name: string | null;
  quote_file_path: string | null;
  created_at?: string;
  updated_at?: string;
}
