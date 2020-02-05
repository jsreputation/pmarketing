export const enum PTransactionRulesState {
  active = 'active',
  inactive = 'inactive',
  approved = 'approved',
  ended = 'ended'
}

export interface IPTransactionRules {
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

export interface IPTriggers {
  data: {
    id: number;
    name: string;
    uuid: string;
  }[];
}

export interface IPPostTrigger {
  name: string;
}

export interface IPPostTriggerResponse {
  id: number;
  name: string;
  uuid: string;
  created_at: string;
  updated_at: string;
}
