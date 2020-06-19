import { ICustomProperties } from '../../profile/profile.model';

export const enum TransactionDetailType {
  'transaction' = 'Transaction',
  'reward' = 'Reward::Transaction'
}

export interface IExpiringPoints {
  expireDate?: string;
  points?: number;
}

export interface IV4Image {
  type: string;
  url: string;
}

export interface LoyaltyTiers {
  id: number;
  name: string;
  attained: boolean;
  pointsRequirement: number;
  pointsDifference: number;
  images?: IV4Image[]; // we don't have a generic named image type yet
  customFields?: ICustomProperties;
}

export interface ILoyalty {
  id: number;
  name: string;
  description?: string;
  beginDate?: string;
  endDate?: string;
  membershipTierName?: string;
  membershipIdentifier?: string;
  pointsBalance: number;
  currencyBalance?: number;
  currency?: string;
  nextTierPoints?: number;
  nextTierPointsDiff?: number;
  nextTierName?: string;
  highestTier?: string;
  expiringPoints?: IExpiringPoints[];
  cardId?: number;
  membershipExpiry?: Date;
  tiers?: LoyaltyTiers[];
}

export interface ITransaction {
  id: number;
  name?: string;
  sku?: string;
  quantity?: string;
  purchaseAmount?: string;
  points: number;
  pointsBalance: number;
  currencyBalance: number;
  earnedDate: string;
  properties: {};
}

export interface IRewardTransactionHistory {
  id: number;
  state: string;
  voucherExpiry: Date;
  userAccount: string;
  rewardName: string;
  redemptionLocation?: string;
  properties?: ITransactionProperties;
}

export interface IPurchaseTransactionHistory {
  id: number;
  productName?: string;
  pharmacyName?: string;
  issuerName?: string;
  transactionDate?: Date;
  transactionRef?: string;
  price?: number;
  currency?: string;
  properties?: ITransactionProperties;
}

export interface ITransactionHistory {
  id: number;
  name?: string;
  identifier?: string;
  transactedAt?: Date;
  pointsAmount?: number;
  properties?: ICustomProperties;
  transactionDetails?: {
    type?: TransactionDetailType,
    data?: IPurchaseTransactionHistory | IRewardTransactionHistory
  };
}

export interface ITransactionProperties {
  productCode?: string;
  productName?: string;
  quantity?: number;
  storeCode?: string;
  storeName?: string;
}

export interface IJoinMethod {
  transactionAmount?: boolean;
  signUp?: boolean;
  inviteOnly?: boolean;
  amount?: number;
  pointsThreshold?: boolean;
  points?: number;
}
