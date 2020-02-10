import { IWAssignedAttributes } from './../voucher/assigneds';
import { IJsonApiItem } from '../../public-api';

export interface IWInstantOutcomeTransactionAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  engagement_id: number;
  campaign_entity_id: number;
  user_id: number;
  results?: IJsonApiItem<{
    campaign_entity_id: number;
    source_type: string;
    source_id: number;
    status: string;
    urn: string;
    created_at: string;
    updated_at: string;
    results: IJsonApiItem<IWAssignedAttributes>[];
  }>
}

export interface IWInstantOutcomeTxnReq {
  engagement_id: number;
  campaign_entity_id: number;
  status: WInstantOutcomeStatus;
}

export enum WInstantOutcomeStatus {
  reserved = 'reserved',
  confirmed = 'confirmed'
}
