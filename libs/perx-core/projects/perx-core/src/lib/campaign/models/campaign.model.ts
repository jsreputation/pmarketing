import { IReward } from '../../rewards/models/reward.model';
import { ICampaignDisplayProperties } from '../../perx-core.models';

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
  description: string;
  type: CampaignType;
  state: CampaignState;
  endsAt: Date | null;
  rewards?: IReward[];
  thumbnailUrl?: string;
  engagementId?: number;
  rawPayload?: any;
  displayProperties?: ICampaignDisplayProperties;
  isComingSoon?: boolean | null;
}

export enum CommChannel {
  sms = 'sms',
  email = 'email'
}
