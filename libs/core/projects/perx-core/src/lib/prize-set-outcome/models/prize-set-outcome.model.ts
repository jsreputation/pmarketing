import { ILoyalty } from '../../loyalty/models/loyalty.model';
import { IReward } from '../../rewards/models/reward.model';
import { OutcomeType } from '../../outcome/models/outcome.model';

export interface IPrizeSetItem {
    id: number;
    actualOutcomeId: number;
    actualOutcomeType: PrizeSetIssuedType;
    campaignPrizeId: number;
    campaignPrizeType: PrizeSetOutcomeType;
    pointsCount?: number;
    state?: string;
    details?: string;
    rewardDetails?: IReward;
    loyaltyDetails?: ILoyalty;
}

export interface IPrizeSetOutcome {
    id: number;
    outcomeType: OutcomeType.prizeSet;
    state: string;
}

export enum PrizeSetOutcomeType {
    reward = 'Reward::Campaign',
    points = 'StoredValue::Campaign'
}

export enum PrizeSetIssuedType {
    voucher = 'Reward::Transaction',
    points = 'StoredValue::Transaction'
}

export enum PrizeSetState {
    inProgress = 'in_progress',
    queued = 'queued',
    reserved = 'reserved',
    completed = 'completed',
    issued = 'issued',
    failed = 'failed'
}
