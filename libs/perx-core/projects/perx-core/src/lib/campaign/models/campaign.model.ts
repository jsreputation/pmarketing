import { IGame } from '../../game/game.model';
import { IStampCard } from '../campaign.service';

export enum CAMPAIGN_TYPE {
  give_reward = 'give_reward',
  stamp = 'stamp',
  game = 'game'
}

enum CAMPAIGN_STATE {
  active = 'active',
  inactive = 'inactive'
}

/*
 * Model from Master branch
 * TODO: delete after review
 */
// export interface ICampaign {
//   id: number;
//   name: string;
//   description: string;
//   begins_at: string;
//   ends_at: any|null;
//   enrolled: boolean;
//   campaign_type: CAMPAIGN_TYPE;
//   campaign_referral_type: any|null;
//   game_config?: any;
//   campaign_config: {
//     campaign_results: {
//       count: number;
//       first_result_id: any|null;
//     };
//     auto_issue_voucher?: boolean;
//     burn_stamps_when_redeeming_for_voucher?: false,
//     use_once_only?: false,
//     used_message_title?: string;
//     used_message_description?: string;
//     stamps_slots?: 10,
//     stamp_slots?: any[]
//   };
//   images: any[];
//   favourite: boolean;
//   custom_fields: any;
//   category_tags: any[];
//   tags: any[];
// }

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
