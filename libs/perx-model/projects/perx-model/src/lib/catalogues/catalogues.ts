export const enum PCatalogueState {
  active = 'active',
  approved = 'approved',
  inactive = 'inactive',
  ended = 'ended'
}

export interface IPCatalogues {
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
