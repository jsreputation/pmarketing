import { WEngagementType } from '../engagement/engagement';

export interface IWCampaignAttributes {
  id?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  urn?: string;
  status?: string;
  start_date_time: string;
  end_date_time?: string;
  goal?: string | null;
  engagement_type: WEngagementType;
  engagement_id: number;
  possible_outcomes?: any;
  comm?: any;
  comm_channel?: null;
  pool_id?: string | null;
  labels?: string[];
  display_properties?: {
    noRewardsPopUp?: {
      headLine?: string;
      subHeadLine?: string;
      imageURL?: string;
      buttonTxt?: string;
    };
    successPopUp?: {
      headLine?: string;
      subHeadLine?: string;
      imageURL?: string;
      buttonTxt?: string;
    };
  };
}
