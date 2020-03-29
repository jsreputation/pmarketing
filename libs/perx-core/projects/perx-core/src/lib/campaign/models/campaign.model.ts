import { IReward } from '../../rewards/models/reward.model';
import { IWCampaignDisplayProperties } from '@perxtech/whistler';

export interface CampaignDisplayProperties extends IWCampaignDisplayProperties {
  landingPage?: {
    body: string;
    media?: { youtube?: string; }
    heading: string;
    buttonText: string;
    subHeading: string;
  };
}

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
  tnc?: string;
  type: CampaignType;
  state: CampaignState;
  endsAt: Date | null;
  beginsAt?: Date | null;
  rewards?: IReward[];
  thumbnailUrl?: string;
  campaignBannerUrl?: string;
  engagementId?: number;
  rawPayload?: any;
  displayProperties?: CampaignDisplayProperties;
}

export enum CommChannel {
  sms = 'sms',
  email = 'email'
}
