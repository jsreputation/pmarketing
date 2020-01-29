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

export const enum MerchantTransactionDetailType {
  'transaction' = 'Transaction',
  'reward' = 'Reward::Transaction'
}

export interface IMerchantPurchaseTransactionHistory {
  id: number;
  productName?: string;
  pharmacyName?: string;
  issuerName?: string;
  transactionDate?: Date;
  transactionRef?: string;
  price?: number;
  currency?: string;
}

export interface IMerchantRewardTransactionHistory {
  id: number;
  state: string;
  voucherExpiry: Date;
  userAccount: string;
  rewardName: string;
  redemptionLocation?: string;
}

export interface IMerchantCustomProperties {
  [key: string]: string | number | boolean;
}

export interface IMerchantTransactionHistory {
  id: number;
  name?: string;
  identifier?: string;
  transactedAt?: Date;
  pointsAmount?: number;
  properties?: IMerchantCustomProperties;
  transactionDetails?: {
    type?: MerchantTransactionDetailType,
    data?: IMerchantPurchaseTransactionHistory | IMerchantRewardTransactionHistory
  };
}

export interface IResetPasswordData {
  clientId: string;
  resetPasswordToken: string;
  password: string;
}
