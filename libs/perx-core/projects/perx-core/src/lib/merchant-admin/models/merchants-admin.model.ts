export interface IMerchantAdminTransaction {
    id: number;
    userAccountId: number;
    updatedAt: Date;
    transactionType: string;
    amount: number;
    transactionDate: Date;
    currency: string;
    workflowId?: number | null;
    createdAt: Date;
    properties?: string | null;
    transactionReference: string;
}

export interface IMerchantAccount {
    id: number;
    customerId: number | null;
    name: string;
    state: string;
    logo: string | null;
    url: string | null;
    type: string | null;
    favourite: string | null;
    isFeatured: boolean;
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
  merchantAccount?: IMerchantAccount;
  createdAt: Date;
  updatedAt: Date;
  state: string;
}
