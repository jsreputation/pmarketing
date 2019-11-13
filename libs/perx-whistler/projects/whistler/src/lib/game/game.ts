import {
  IJsonApiItem,
  IWAssignedAttributes
} from '../../public-api';

export interface IWAttbsObjTrans {
  urn: string;
  created_at: string;
  updated_at: string;
  engagement_id: number;
  campaign_entity_id: number;
  user_id: number;
  results: IJsonApiItem<IWResultsObj>;
}

export interface IWResultsObj {
  campaign_entity_id: number;
  source_type: number;
  source_id: number;
  urn: string;
  created_at: string;
  updated_at: string;
  results: IJsonApiItem<IWAssignedAttributes>[];
}
