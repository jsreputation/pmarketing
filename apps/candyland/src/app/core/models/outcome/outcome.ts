import { IRewardEntity } from '../reward/reward-entity.interface';

export interface IOutcome {
    id?: string;
    resultId?: number;
    resultType?: string;
    probability?: number;
    slotNumber?: number;
    limit?: number;
    rewardsOptions?: ICampaignOutcomeRewardOptions;
}

export interface ICampaignOutcomeRewardOptions {
    probability?: number;
    limit?: number;
    value?: IRewardEntity | { probability: 0, outcomeId: '' };
}
