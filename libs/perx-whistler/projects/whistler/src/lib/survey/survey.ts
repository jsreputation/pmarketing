import { IWQuestion } from './question';

export interface IWSurveyAttributes {
  id: string;
  title: string;
  description: string;
  image_url: string;
  properties: IWSurveyProperties;
  display_properties: IWSurveyDisplayProperties;
}

export interface IWSurveyProperties {
  [key: string]: any;
}

export interface IWSurveyDisplayProperties {
  title: string;
  sub_title: string;
  background_img_url: string;
  progress_bar_color: string;
  card_background_img_url: string;
  questions: IWQuestion[];
  disProp?: {
    noRewardsPopUp?: {
      headLine?: string,
      subHeadLine?: string,
      imageUrl?: string
    }
  };
}

export interface IWPostAnswerAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  engagement_id: number;
  campaign_entity_id: number;
  results: IWOutcomes;
}

export interface IWOutcomes {
  id: string;
  attributes: {
    results: any[];
  };
  relationships: any;
  type: string;
}
