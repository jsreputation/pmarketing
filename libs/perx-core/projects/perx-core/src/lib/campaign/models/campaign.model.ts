import { IGame } from '../../game/game.model';
import { IStampCard } from '../campaign.service';

export enum CAMPAIGN_TYPE {
  give_reward = 'give_reward',
  stamp = 'stamp',
  game = 'game'
}

export enum CAMPAIGN_STATE {
  active = 'active',
  inactive = 'inactive'
}

/*
 * Model from Whistler data model
 * https://docs.google.com/document/d/10TNUw5nC5D2MGSRFi_2XshMKIzjdV1OA2L6Da4YGb3E/edit#heading=h.aym9q8b05e18
 */
export interface ICampaign {
  id: number;
  name: string;
  description: string;
  type: CAMPAIGN_TYPE;
  state: CAMPAIGN_STATE;
  games?: IGame[];
  stampCards?: IStampCard[];
  icon: string;
}
