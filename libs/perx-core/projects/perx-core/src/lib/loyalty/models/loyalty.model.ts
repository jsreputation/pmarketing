import {ICustomProperties} from '../../profile/profile.model';

export const enum TransactionDetailType {
  'transaction' = 'Transaction',
  'reward' = 'Reward::Transaction'
}

export interface IExpiringPoints {
  expireDate?: string;
  points?: number;
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
}

export interface ITransaction {
  id: number;
  name?: string;
  sku?: string;
  quantity?: number;
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

export interface IJoinMethod {
  transactionAmount?: boolean;
  signUp?: boolean;
  inviteOnly?: boolean;
  amount?: number;
  pointsThreshold?: boolean;
  points?: number;
}
