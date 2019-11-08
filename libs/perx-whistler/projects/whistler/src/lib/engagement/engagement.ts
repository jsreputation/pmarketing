import { IWSurveyDisplayProperties } from './survey';
import { IWInstantOutcomeDisplayProperties } from './instant-outcome';
import {
  IWGameDisplayProperties,
  IWPinataDisplayProperties,
  IWScratchDisplayProperties,
  IWTreeDisplayProperties,
  WGameType
} from './games';
import { IWStampDisplayProperties } from './stamp';

export enum WEngagementType {
  games = 'game',
  survey = 'survey',
  stamp = 'stamp',
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
  // IWSurveyDisplayProperties |
  // IWInstantOutcomeDisplayProperties |
  // IWGameDisplayProperties |
  // IWTreeDisplayProperties |
  // IWPinataDisplayProperties;
}

export interface IWGameEngagementAttributes extends IWEngagementAttributes<IWGameDisplayProperties |
  IWTreeDisplayProperties |
  IWPinataDisplayProperties> {
  game_type: WGameType;
}

export interface IWTreeGameEngagementAttributes extends IWEngagementAttributes<IWTreeDisplayProperties> {
}

export interface IWPinataGameEngagementAttributes extends IWEngagementAttributes<IWPinataDisplayProperties> {
}

export interface IWScratchGameEngagementAttributes extends IWEngagementAttributes<IWScratchDisplayProperties> {
}

export interface IWInstantOutcomeEngagementAttributes extends IWEngagementAttributes<IWInstantOutcomeDisplayProperties> {
}

export interface IWSurveyEngagementAttributes extends IWEngagementAttributes<IWSurveyDisplayProperties> {
}

export interface IWStampEngagementAttributes extends IWEngagementAttributes<IWStampDisplayProperties> {
}


