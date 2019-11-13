import { IWCampaignDisplayProperties } from '../../public-api';

export interface IWOutcome {
    resultId: number;
    resultType: string;
    probability: number;
    lootBoxId?: number;
}
export interface IWOutcomeAttributes {
    result_id: number;
    result_type: string;
    probability?: number;
    loot_box_id?: number;
    no_outcome?: boolean;
    campaign_entity_id?: number;
}

export interface IWCampaignProperties {
  engagementId: number;
  display_properties: IWCampaignDisplayProperties;
}
