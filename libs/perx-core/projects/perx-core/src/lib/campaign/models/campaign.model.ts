export enum CampaignType {
  give_reward = 'give_reward',
  stamp = 'stamp',
  game = 'game'
}

export enum CampaignState {
  active = 'active',
  inactive = 'inactive'
}

export interface ICampaign {
  id: number;
  name: string;
  description: string;
  type: CampaignType;
  state: CampaignState;
}
