import { ICustomProperties } from '../../profile/profile.model';
import { ITransactionProperties } from '../../transactions/models/transactions.model';

export const enum TransactionDetailType {
  'transaction' = 'Transaction',
  'reward' = 'Reward::Transaction',
  'game' = 'GameTransaction',
  'stamp' = 'StampTransaction',
  'dashboard' = 'DeviseUser',
  'user' = 'User::Account',
  'quest' = 'UserQuest',
  'leaderboard' = 'LeaderboardPodium',
  'progressCampaign' = 'ProgressPointsTransaction',
  'instantOutcomeCampaign' = 'InstantOutcomeTransaction',
  'rule' = 'TransactionRule'
}

export interface IExpiringPoints {
  expireDate?: string;
  points?: number;
}

export interface IV4Image {
  type?: string;
  url: string;
  section?: string;
}
export interface LoyaltyImages {
  thumbnailUrl?: string;
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
  pointsToCurrencyRate?: number;
  currency?: string;
  nextTierPoints?: number;
  nextTierPointsDiff?: number;
  nextTierName?: string;
  highestTier?: string;
  expiringPoints?: IExpiringPoints[];
  cardId?: number;
  membershipExpiry?: Date;
  tiers?: LoyaltyTiers[];
  membershipState?: 'active' | 'pending' | 'inactive' | 'expire';
  images?: LoyaltyImages;
  tierPoints?: number;
}

export interface IExchangerate {
  id: number;
  destinationAmount: number;
  destinationCampaignEndsAt: Date;
  destinationCampaignId: number;
  destinationCampaignName: string;
  sourceAmount: number;
  sourceCampaignEndsAt: Date;
  sourceCampaignId: number;
  sourceCampaignName: string;
}
export interface IPointTransfer {
  sourceId: number;
  destinationId: number;
  amount: number;
}

export interface ILoyaltyTransaction {
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
  loyaltyName?: string;
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

export interface ICampaignTransactionHistory {
  id: number;
  campaignName: string;
  properties?: ITransactionProperties;
}

export interface ILeaderBoardTransactionHistory {
  id: number;
  leaderboardName: string;
  properties?: ITransactionProperties;
}

export interface IRuleTransactionHistory {
  id: number;
  ruleName: string;
  properties?: ITransactionProperties;
}


export interface ILoyaltyTransactionHistory {
  id: number;
  name?: string;
  identifier?: string;
  loyaltyName?: string;
  transactedAt?: Date;
  pointsAmount?: number;
  properties?: ICustomProperties;
  transactionDetails?: {
    type?: TransactionDetailType,
    data?: IPurchaseTransactionHistory | IRewardTransactionHistory | ICampaignTransactionHistory
     | ILeaderBoardTransactionHistory | IRuleTransactionHistory
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
