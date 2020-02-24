import { IWCampaignDisplayProperties } from '@perx/whistler';

export interface IAnswer {
  questionId?: string;
  content: any;
}

export interface IPoints {
  questionId?: string;
  point: number;
}

export interface IDateRange {
  from: string;
  to: string;
}
export interface ITracker {
  [key: string]: any;
}

export interface IQuestion {
  id?: string;
  question: string;
  description?: string;
  required: boolean;
  payload: IPayload;
  answer?: any;
}
export enum MaterialColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}

export interface ISurveyOutcome {
  title: string;
  subTitle: string;
  image?: string;
  button: string;
}

export interface ISurvey {
  id?: string;
  title: string;
  subTitle?: string;
  progressBarColor?: MaterialColor;
  cardBackgroundImgUrl?: string;
  backgroundImgUrl?: string;
  questions: IQuestion[];
  results: {
    outcome?: ISurveyOutcome;
    noOutcome?: ISurveyOutcome;
  };
  displayProperties?: IWCampaignDisplayProperties;
}

export enum SurveyQuestionType {
  rating = 'rating',
  pictureChoice = 'picture-select',
  longText = 'long-text',
  multipleChoice = 'select',
  questionGroup = 'group',
  date = 'date',
  phone = 'phone',
  password = 'password'
}

export interface IErrors {
  hasError?: boolean;
  isRequired?: boolean;
  isValidDate?: boolean;
  exceedMaxLength?: boolean;
  isValidPhoneNumber?: boolean;
  isValidDateRange?: boolean;
  inValidEmail?: boolean;
}

export interface IPayload {
  type: SurveyQuestionType;
  [key: string]: any;
}
/* eslint-disable */
export enum SurveyRatingIcons {
  star = 'star_border',
  star_selected = 'star',
  heart = 'favorite_border',
  heart_selected = 'favorite',
  circle = 'panorama_fish_eye',
  circle_selected = 'brightness_1',
}
/* eslint-enable */
