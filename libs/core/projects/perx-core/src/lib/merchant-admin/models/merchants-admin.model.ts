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
  'purchase' = 'purchase',
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
  pointsIssued: number;
  merchantName?: string;
  description?: string;
}

export interface IMerchantRewardTransactionHistory {
  id: number;
  issuedDate: Date;
  userAccount: string;
  customerName: string;
  rewardName: string;
  redemptionDate?: Date;
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

export interface IMerchantInvoice {
  id: number;
  collectedAmount?: number;
  identifier?: string;
  description: string;
  voucherId?: number | null;
  voucherName?: string;
  pointId?: number | null;
  pointsPaid?: number;
  transactionId?: number| null;
}

export enum MerchantTransactionItemType {
  reward = 'Reward::Transaction',
  point = 'StoredValue::Transaction',
  transaction = 'Transaction'
}
