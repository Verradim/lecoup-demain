
export interface WorkDescription {
  id?: string;
  description: string;
}

export interface WorkTitle {
  id?: string;
  title: string;
  work_descriptions: WorkDescription[];
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  work_titles?: WorkTitle[];
  work_location: string | null;
  start_date: string | null;
  end_date: string | null;
  quote_file_name: string | null;
  quote_file_path: string | null;
  created_at?: string;
  updated_at?: string;
}
