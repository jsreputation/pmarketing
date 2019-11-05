import { IReward } from '../../rewards/models/reward.model';
import { IDisplayProperties } from '../../perx-core.models';

export enum CampaignType {
  give_reward = 'give_reward', // instant_outcome
  stamp = 'stamp', // loyalty
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
  endsAt: Date | null;
  rewards?: IReward[];
  thumbnailUrl?: string;
  engagementId?: number;
  rawPayload?: any;
  displayProperties?: IDisplayProperties;
}

export enum CommChannel {
  sms = 'sms',
  email = 'email'
}
