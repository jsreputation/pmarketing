import { IJsonApiItem } from '../jsonapi.payload';
import { IWAssignedAttributes } from '../../public-api';

export const enum WGameType {
  shakeTheTree = 'shake',
  pinata = 'tap',
  scratch = 'scratch'
}

export interface IWAttbsObjGame {
  number_of_tries?: number;
  urn: string;
  created_at: string;
  updated_at: string;
  game_type: WGameType;
  type?: string;
  title: string;
  description: string;
  image_url: string;
  properties: {};
  display_properties: IWGameDisplayProperties;
}

export interface IWGameDisplayProperties {
  title: string;
  button: string;
  sub_title: string;
  background_img_url?: string;
}

export interface IWTreeDisplayProperties extends IWGameDisplayProperties {
  tree_img_url: string;
  nb_hanged_gifts: number;
  gift_box_img_url: string;
  background_img_url: string;
  nb_gifts_to_drop?: number;
}

export interface IWPinataDisplayProperties extends IWGameDisplayProperties {
  closed_pinata_img_url: string;
  cracking_pinata_img_url: string;
  opened_pinata_img_url: string;
}

export interface IWScratchDisplayProperties extends IWGameDisplayProperties {
  post_scratch_fail_img_url: string;
  post_scratch_success_img_url: string;
  pre_scratch_img_url: string;
}

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
