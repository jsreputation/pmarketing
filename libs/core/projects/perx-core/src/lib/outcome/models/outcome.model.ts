import { IWCampaignDisplayProperties } from '@perxtech/whistler';
import { PrizeSetIssuedType } from '../../prize-set-outcome/models/prize-set-outcome.model';

export interface IOutcome {
  title: string;
  button: string;
  subTitle: string;
  banner: string;
  backgroundImgUrl: string;
  cardBackgroundImgUrl: string;
  results: {
    noOutcome?: IOutcomeMsg;
  };
  displayProperties?: IWCampaignDisplayProperties;
}

export interface IMilestoneIssuedOutcome {
  id: number;
  milestoneId: number;
  outcomeId: number;
  outcomeType: PrizeSetIssuedType;
  progressPointsTransactionId: number;
  state: string; // success
}

export interface IOutcomeMsg {
  title: string;
  subTitle: string;
  image?: string;
  button: string;
}

export enum OutcomeType {
  reward = 'reward',
  points = 'points',
  custom = 'custom',
  prizeSet = 'prize_set',
  badge = 'badge',
}
