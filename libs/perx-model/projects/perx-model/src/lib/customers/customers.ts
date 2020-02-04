export const enum PCustomerState {
  active = 'active',
  inactive = 'inactive'
}

export interface IPCustomer {
  id: number;
  customer_id: string;
  state: PCustomerState;
  alternate_id: null;
  joined_at: string;
  activatable: boolean;
  deactivatable: boolean;
}

export interface IPCustomers {
  data: IPCustomer[];
  meta: {
    count: number;
    size: number;
    total_pages: number;
    page: number;
  };
}
