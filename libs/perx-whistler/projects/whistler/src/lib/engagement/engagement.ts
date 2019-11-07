import { IWSurveyDisplayProperties } from './survey';
import { IWInstantOutcomeDisplayProperties } from './instant-outcome';
import { IWGameDisplayProperties, IWPinataDisplayProperties, IWTreeDisplayProperties, WGameType } from './games';

export enum WEngagementType {
  games = 'game',
  survey = 'survey',
  instantOutcome = 'instant_outcome',
  loyalty = 'loyalty',
}

export interface IWEngagementProperties {
  [key: string]: any;
}

// common engagement
export interface IWEngagementAttributes {
  id?: string;
  number_of_tries?: number;
  urn?: string;
  created_at: string;
  updated_at: string;
  game_type?: WGameType;
  type?: string;
  title: string;
  description: string;
  image_url: string;
  properties: IWEngagementProperties;
  display_properties:
    IWSurveyDisplayProperties |
    IWInstantOutcomeDisplayProperties |
    IWGameDisplayProperties |
    IWTreeDisplayProperties |
    IWPinataDisplayProperties;
}

export interface IWGameEngagementAttributes extends IWEngagementAttributes {
  display_properties: IWGameDisplayProperties | IWTreeDisplayProperties | IWPinataDisplayProperties;
}

export interface IWTreeGameEngagementAttributes extends IWGameEngagementAttributes {
  display_properties: IWTreeDisplayProperties;
}

export interface IWPinataGameEngagementAttributes extends IWGameEngagementAttributes {
  display_properties: IWPinataDisplayProperties;
}

export interface IWInstantOutcomeEngagementAttributes extends IWEngagementAttributes {
  display_properties: IWInstantOutcomeDisplayProperties;
}

export interface IWSurveyEngagementAttributes extends IWEngagementAttributes {
  display_properties: IWSurveyDisplayProperties;
}
