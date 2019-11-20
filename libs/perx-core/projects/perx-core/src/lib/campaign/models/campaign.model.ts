import { IReward } from '../../rewards/models/reward.model';
import { IWCampaignDisplayProperties } from '@perx/whistler';

export enum CampaignType {
  // eslint-disable-next-line
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
  description: string | null;
  type: CampaignType;
  state: CampaignState;
  endsAt: Date | null;
  beginsAt?: Date | null;
  rewards?: IReward[];
  thumbnailUrl?: string;
  engagementId?: number;
  rawPayload?: any;
  displayProperties?: IWCampaignDisplayProperties;
}

export enum CommChannel {
  sms = 'sms',
  email = 'email'
}
