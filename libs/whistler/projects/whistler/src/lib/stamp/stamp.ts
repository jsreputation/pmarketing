import { IWProperties } from '../../public-api';

export interface IWAttbsObjStamp {
  urn: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image_url: string;
  properties: object;
  display_properties: {
    slots: number[];
    title: string;
    sub_title?: string;
    button: string;
    nb_of_slots: number;
    pre_stamp_img_url: string;
    post_stamp_img_url: string;
    reward_pre_stamp_img_url: string;
    reward_post_stamp_img_url: string;
    card_background_img_url: string;
    background_img_url: string;
    display_campaign_as: string;
    noRewardsPopUp?: IWProperties;
    successPopUp?: IWProperties;
  };
}
