import { IWSurveyDisplayProperties } from './survey';
import { IWInstantOutcomeDisplayProperties } from './instant-outcome';
import {
  IWGameDisplayProperties,
  IWPinataDisplayProperties,
  IWScratchDisplayProperties, IWSpinDisplayProperties,
  IWTreeDisplayProperties,
  WGameType
} from './games';
import { IWStampDisplayProperties } from './stamp';

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
export interface IWEngagementAttributes<T = any> {
  id?: string;
  number_of_tries?: number;
  urn?: string;
  created_at?: string;
  updated_at?: string;
  game_type?: WGameType;
  type?: string;
  title: string;
  description?: string;
  image_url?: string;
  properties?: IWEngagementProperties;
  display_properties: T;
}

export interface IWGameEngagementAttributes extends IWEngagementAttributes<IWGameDisplayProperties |
  IWTreeDisplayProperties |
  IWPinataDisplayProperties |
  IWSpinDisplayProperties> {
  game_type: WGameType;
}

// Made to further expand the interfaces for each of the engagements types
export interface IWTreeGameEngagementAttributes extends IWEngagementAttributes<IWTreeDisplayProperties> {
  display_properties: IWTreeDisplayProperties;
}

export interface IWPinataGameEngagementAttributes extends IWEngagementAttributes<IWPinataDisplayProperties> {
  display_properties: IWPinataDisplayProperties;
}

export interface IWSpinGameEngagementAttributes extends IWEngagementAttributes<IWSpinDisplayProperties> {
  display_properties: IWSpinDisplayProperties;
}

export interface IWScratchGameEngagementAttributes extends IWEngagementAttributes<IWScratchDisplayProperties> {
  display_properties: IWScratchDisplayProperties;
}

export interface IWInstantOutcomeEngagementAttributes extends IWEngagementAttributes<IWInstantOutcomeDisplayProperties> {
  display_properties: IWInstantOutcomeDisplayProperties;
}

export interface IWSurveyEngagementAttributes extends IWEngagementAttributes<IWSurveyDisplayProperties> {
  display_properties: IWSurveyDisplayProperties;
}

export interface IWStampEngagementAttributes extends IWEngagementAttributes<IWStampDisplayProperties> {
  display_properties: IWStampDisplayProperties;
}
