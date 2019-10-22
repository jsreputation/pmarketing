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

export interface IMerchantProfile {
  id: number;
  email: string;
  username: string;
  mobile: string;
  locationId: number;
  merchantAccountId: number;
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt: Date;
  state: string;
}
