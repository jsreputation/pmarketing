import { IWCampaignDisplayProperties } from '@perxtech/whistler';

export interface IQAnswer {
  questionId: string;
  content: any;
}

export interface IPoints {
  questionId: string;
  time?: number;
  question: string;
  point: number;
}

export interface IDateRange {
  from: string;
  to: string;
}
export interface ITracker<T = any> {
  [key: string]: T;
}

export interface IQQuestion {
  id: string;
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

export interface IQuiz {
  id?: string;
  title: string;
  subTitle?: string;
  progressBarColor?: MaterialColor;
  cardBackgroundImgUrl?: string;
  backgroundImgUrl?: string;
  questions: IQQuestion[];
  results: {
    outcome?: ISurveyOutcome;
    noOutcome?: ISurveyOutcome;
  };
  displayProperties?: IWCampaignDisplayProperties;
}

export enum QuizQuestionType {
  rating = 'rating',
  pictureChoice = 'picture-select',
  longText = 'long-text',
  multipleChoice = 'select',
  swipeDelete = 'swipe-delete'
}

export interface IErrors {
  hasError?: boolean;
  isRequired?: boolean;
  isValidDate?: boolean;
  exceedMaxLength?: boolean;
  isValidPhoneNumber?: boolean;
  isValidDateRange?: boolean;
  isInvalidEmail?: boolean;
}

export interface IPayload {
  type: QuizQuestionType;
  [key: string]: any;
}

export enum SurveyRatingIcons {
  star = 'star_border',
  starSelected = 'star',
  heart = 'favorite_border',
  heartSelected = 'favorite',
  circle = 'panorama_fish_eye',
  circleSelected = 'brightness_1',
}

// For SlideList Component
export interface Configuration {
  slideThreshold?: number;
  listType?: string;
  classname?: string;
  disableWarnings?: boolean;
  numberOfDeleteIcon?: number;
}

export enum ListType {
  SINGLELINE = 'singleline',
  MULTILINE = 'multiline',
  LISTWITHICON = 'listwithicon',
  LISTWITHIMAGE = 'listwithimage',
}

export enum Warnings {
  CONFIG_NOT_LOADED = 'CONFIG_NOT_LOADED',
  ADDING_DEFAULT_SLIDE_THRESHOLD = 'ADDING_DEFAULT_SLIDE_THRESHOLD',
  ZERO_SLIDE_THRESHOLD_NOT_ALLOWED = 'ZERO_SLIDE_THRESHOLD_NOT_ALLOWED',
  SLIDE_THRESHOLD_NOT_FOUND = 'SLIDE_THRESHOLD_NOT_FOUND',
  MAX_SLIDE_THRESHOLD_NOT_ALLOWED = 'MAX_SLIDE_THRESHOLD_NOT_ALLOWED',
  INVALID_SLIDE_THRESHOLD_NOT_ALLOWED = 'INVALID_SLIDE_THRESHOLD_NOT_ALLOWED'
}

export const Constants = {
  CONFIG_NOT_LOADED : 'You have not provided the configuration values, default will be loaded.',
  ADDING_DEFAULT_SLIDE_THRESHOLD: 'Will keep it default i.e.',
  SLIDE_THRESHOLD_NOT_FOUND: 'You have not provided the slideThreshold.',
  ZERO_SLIDE_THRESHOLD_NOT_ALLOWED: 'slideThreshold value can not be 0 or less than 0.',
  MAX_SLIDE_THRESHOLD_NOT_ALLOWED: 'slideThreshold value should be less than 50.',
  INVALID_SLIDE_THRESHOLD_NOT_ALLOWED: 'slideThreshold value is invalid, Expecting number between 0 to 50.',
  MAX_SLIDE_THRESHOLD: 50,
  MIN_SLIDE_THRESHOLD: 0,
  DEFAULT_SLIDE_THRESHOLD: 50,
  NUMBER_OF_DELETE_ICONS : 2,
  DEFAULT_CLASS_NAME: 'ngstd-main-canvas'
};
