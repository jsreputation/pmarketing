export enum CAMPAIGN_TYPE {
  give_reward = 'give_reward',
  stamp = 'stamp',
  game = 'game'
}

export enum CAMPAIGN_STATE {
  active = 'active',
  inactive = 'inactive'
}

export interface ICampaign {
  id: number;
  name: string;
  description: string;
  type: CAMPAIGN_TYPE;
  state: CAMPAIGN_STATE;
}
