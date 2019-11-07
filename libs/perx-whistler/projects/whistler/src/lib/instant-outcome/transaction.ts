import { IWAssignedAttributes } from './../voucher/assigneds';

export interface IWInstantOutcomeTransactionAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  engagement_id: number;
  campaign_entity_id: number;
  user_id: number;
  results: {
    id: string;
    type: string;
    attributes: {
      campaign_entity_id: number;
      source_type: string;
      source_id: number;
      urn: string;
      created_at: string;
      updated_at: string;
      results: {
        id: string;
        type: string;
        attributes: IWAssignedAttributes;
      }[];
    };
  };
}

export interface IWInstantOutcomeTxnReq {
  engagement_id: number;
  campaign_entity_id: number;
}
