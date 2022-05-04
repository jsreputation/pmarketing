import { IReward } from '../../rewards/models/reward.model';
import { ILoyalty } from '../../loyalty/models/loyalty.model';
import { IBadge } from '../../badges/models/badge.model';

export interface IInstantOutcomeTransaction {
  id: number;
  campaignId: number;
  details: string | null;
  outcomes: IInstantOutcome[];
  state: InstantOutcomeTransactionState;
}

export interface IInstantOutcome {
  id: number;
  actualOutcomeId: number;
  actualOutcomeType: InstantOutcomeActualOutcomeType;
  campaignPrizeId: number;
  campaignPrizeType: InstantOutcomeCampaignPrizeType;
  details: string | null;
  instantOutcomeTransactionId: number;
  state: InstantOutcomeState;
  rewardDetails?: IReward;
  loyaltyDetails?: ILoyalty;
  badgeDetails?: IBadge;
  pointsCount?: number;
}

export enum InstantOutcomeCampaignPrizeType {
  reward = 'Reward::Campaign',
  points = 'StoredValue::Campaign',
  badge = 'Badge'
}

export enum InstantOutcomeActualOutcomeType {
  voucher = 'Reward::Transaction',
}

export enum InstantOutcomeState {
  issued = 'issued',
}

export enum InstantOutcomeTransactionState {
  issued = 'issued',
  redeemed = 'redeemed',
  inProgress = 'in_progress',
  completed = 'completed',
  failed = 'failed',
}
