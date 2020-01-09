import { WEngagementType } from '../engagement/engagement';
import { IWProperties } from '../whistler.models';

export enum WCampaignStatus {
  scheduled = 'scheduled',
  paused = 'paused',
  active = 'active',
  ended = 'ended',
  draft = 'draft'
}

export interface IWCampaignAttributes {
  id?: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  urn?: string;
  status?: WCampaignStatus;
  start_date_time: string;
  end_date_time?: string;
  goal?: string | null;
  engagement_type: WEngagementType;
  engagement_id: number;
  possible_outcomes?: any;
  comm?: any;
  comm_channel?: null;
  // pool_id is mandatory, if left empty during campaign edition, then it should be null
  pool_id: number | null;
  labels?: string[];
  audience_segment?: IWAudienceFilter;
  display_properties?: IWCampaignDisplayProperties;
}

export interface IWCampaignDisplayProperties {
  informationCollectionSetting?: WInformationCollectionSettingType;
  weblink?: boolean;
  noRewardsPopUp?: IWProperties;
  successPopUp?: IWProperties;
}

export enum WInformationCollectionSettingType {
  not_required = 'not_required',
  pi_required = 'pi_required',
  signup_required = 'signup_required'
}

export interface IWAudienceFilter {
  gender?: string;
  age?: IWDateRange[];
}

interface IWDateRange {
  from: number;
  to: number;
}
