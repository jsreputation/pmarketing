import { IWCampaignDisplayProperties } from '../../public-api';

export interface IWOutcome {
  resultId: number;
  resultType: string;
  probability: number;
  lootBoxId?: number;
  limit: number | null;
}
export interface IWOutcomeAttributes {
  result_id?: number | null;
  result_type?: string;
  probability?: number;
  loot_box_id?: number;
  no_outcome?: boolean;
  domain_id?: number;
  domain_type?: string;
  max_issuance_per_campaign?: number;
}

export interface IWCampaignProperties {
  engagementId: number;
  display_properties: IWCampaignDisplayProperties;
}
