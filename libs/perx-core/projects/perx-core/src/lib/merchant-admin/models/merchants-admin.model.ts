export interface IMerchantAdminTransaction {
    id: number;
    user_account_id: number;
    updated_at: Date;
    transaction_type: string;
    amount: number;
    transaction_date: Date;
    currency: string;
    workflow_id?: number | null;
    created_at: Date;
    properties?: string | null;
    transaction_reference: string;
}

export interface IMerchantAccount {
    id: number;
    customer_id: number | null;
    name: string;
    state: string;
    logo: string | null;
    url: string | null;
    type: string | null;
    favourite: string | null;
    is_featured: boolean;
    tags: IMerchantTag[];
}

export interface IMerchantTag {
  id: number;
  name: string;
}

export interface IMerchantProfile {
  id: number;
  email: string;
  username: string;
  mobile: string;
  locationId: number;
  merchantAccountId?: number;
  merchant_account?: IMerchantAccount;
  createdAt: Date;
  updatedAt: Date;
  state: string;
}
