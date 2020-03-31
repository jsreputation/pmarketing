import { IWCampaignDisplayProperties } from '@perxtech/whistler';

export interface IQAnswer {
  questionId: string;
  content: (string | number)[];
  timeTaken?: number; // in seconds
}

export interface IPoints {
  questionId: string;
  time?: number;
  question: string;
  points: number;
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
  id?: number;
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
  multipleChoice = 'select'
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
