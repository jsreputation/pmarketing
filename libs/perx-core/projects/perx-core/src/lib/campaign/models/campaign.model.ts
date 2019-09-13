import { IReward } from '../../rewards/models/reward.model';

export enum CampaignType {
  give_reward = 'give_reward',
  stamp = 'stamp',
  game = 'game',
  survey = 'survey'
}

export enum CampaignState {
  active = 'active',
  inactive = 'inactive',
  draft = 'draft'
}

export interface ICampaign {
  id: number;
  name: string;
  description: string;
  type: CampaignType;
  state: CampaignState;
  endsAt: Date;
  rewards?: IReward[];
  thumbnailUrl?: string;
  rawPayload?: any;
}

export enum CommChannel {
  sms = 'sms',
  email = 'email'
}
