export interface AdzunaJob {
  id: string;
  title: string;
  description: string;

  company: {
    display_name: string;
  };

  location: {
    display_name: string;
  };

  salary_min?: number;
  salary_max?: number;

  created: string;

  category: {
    label: string;
    tag: string;
  };

  redirect_url: string;
}

export interface AdzunaResponse {
  count: number;
  mean: number;
  results: AdzunaJob[];
}