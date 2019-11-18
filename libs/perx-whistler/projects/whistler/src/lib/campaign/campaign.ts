import { WEngagementType } from '../engagement/engagement';
import { IWProperties } from '../whistler.models';

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
  display_properties?: IWCampaignDisplayProperties;
}

export interface IWCampaignDisplayProperties {
  informationCollectionSetting?: WInformationCollectionSettingType;
  noRewardsPopUp?: IWProperties;
  successPopUp?: IWProperties;
}

export enum WInformationCollectionSettingType {
  not_required = 'not_required',
  pi_required = 'pi_required',
  signup_required = 'signup_required'
}
