export const enum PCategoryUsage {
  rewards = 'Rewards',
  merchants = 'Merchants',
  campaigns = 'Campaigns',
  catalogs = 'Catalogs'
}

export interface IPCategories {
  data: any[];
  meta: {
    count: number;
    size: number;
    page: number;
    current_page: number;
    per_page: number;
    prev_page: null;
    next_page: null;
    total_pages: number;
    total_count: number;
  };
}

export interface IPPostCategories {
  title: string;
  description: string;
  parent_id: null;
  usage: PCategoryUsage[];
}
