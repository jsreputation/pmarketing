import { ICampaignDisplayProperties } from '../../perx-core.models';

export interface IAnswer {
  question_id?: string;
  content: any;
}

export interface IPoints {
  question_id?: string;
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
export interface ISurvey {
  id?: string;
  title: string;
  sub_title?: string;
  progress_bar_color?: MaterialColor;
  card_background_img_url?: string;
  background_img_url?: string;
  questions: IQuestion[];
  displayProperties?: ICampaignDisplayProperties;
}

export enum SurveyQuestionType {
  rating = 'rating',
  pictureChoice = 'picture-select',
  longText = 'long-text',
  multipleChoice = 'select',
  questionGroup = 'group',
  date = 'date',
  phone = 'phone'
}

export interface IErrors {
  hasError?: boolean;
  isRequired?: boolean;
  isValidDate?: boolean;
  exceedMaxLength?: boolean;
  isValidPhoneNumber?: boolean;
  isValidDateRange?: boolean;
}

export interface IPayload {
  type: SurveyQuestionType;
  [key: string]: any;
}

export enum SurveyRatingIcons {
  star = 'star_border',
  star_selected = 'star',
  heart = 'favorite_border',
  heart_selected = 'favorite',
  circle = 'panorama_fish_eye',
  circle_selected = 'brightness_1',
}
