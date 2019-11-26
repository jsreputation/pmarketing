import { IWQuestion } from './survey-question';
import { WInformationCollectionSettingType } from '../campaign/campaign';

export interface IWSurveyDisplayProperties {
  title: string;
  sub_title: string;
  background_img_url: string;
  progress_bar_color: string;
  card_background_img_url: string;
  questions: IWQuestion[];
  button?: string;
  informationCollectionSetting?: WInformationCollectionSettingType;
  noRewardsPopUp?: {
    headLine?: string;
    subHeadLine?: string;
    imageURL?: string;
    buttonTxt?: string;
  };
  successPopUp?: {
    headLine?: string;
    subHeadLine?: string;
    imageURL?: string;
    buttonTxt?: string;
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
