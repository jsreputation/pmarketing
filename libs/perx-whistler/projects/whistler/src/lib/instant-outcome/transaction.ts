import { IAssignedAttributes } from './../voucher/assigneds';

export interface IInstantOutcomeTransactionAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  engagement_id: number;
  campaign_entity_id: number;
  user_id: number;
  results?: {
    id: string;
    type: string;
    attributes: {
      campaign_entity_id: number;
      source_type: string;
      source_id: number;
      status: string;
      urn: string;
      created_at: string;
      updated_at: string;
      results: {
        id: string;
        type: string;
        attributes: IAssignedAttributes;
      }[];
    };
  };
}

export interface IInstantOutcomeTxnReq {
  engagement_id: number;
  campaign_entity_id: number;
}
