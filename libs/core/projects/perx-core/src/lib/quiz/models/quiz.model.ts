import { IWCampaignDisplayProperties } from '@perxtech/whistler';
import { ILongTextPayload } from '../question/long-text/long-text.component';
import { IPictureSelectPayload } from '../question/picture-select/picture-select.component';
import { IRatingPayload } from '../question/rating/rating.component';
import { ISelectPayload } from '../question/select/select.component';
import { ISwipePayload } from '../question/swipe-list/swipe-list.component';

export interface IQAnswer {
  questionId: string;
  content: (string | number)[];
  timeTaken?: number; // in seconds
}

export interface IPoints {
  questionId: string;
  time?: number;
  question: string;
  points?: number;
}

export interface IDateRange {
  from: string;
  to: string;
}

export interface ITracker<T = any> {
  [key: string]: T;
}

export interface IQQuestion<T = any> {
  id: string;
  question: string;
  description?: string;
  required: boolean;
  payload: IPayload;
  answer?: any;
  meta?: T;
}

export enum MaterialColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}

export interface IQuizOutcome {
  title: string;
  subTitle: string;
  image?: string;
  button: string;
}

export enum QuizMode {
  basic,
  swipe,
  elimination
}

export interface IQuiz {
  id?: number;
  campaignId?: number;
  title: string;
  subTitle?: string;
  progressBarColor?: MaterialColor;
  cardBackgroundImgUrl?: string;
  backgroundImgUrl?: string;
  questions: IQQuestion[];
  mode: QuizMode;
  results: {
    outcome?: IQuizOutcome;
    noOutcome?: IQuizOutcome;
  };
  remainingNumberOfTries?: number;
  displayProperties?: IWCampaignDisplayProperties;
}

export enum QuizQuestionType {
  rating = 'rating',
  pictureChoice = 'picture-select',
  longText = 'long-text',
  multipleChoice = 'select',
  swipeDelete = 'swipe-eliminate',
  swipeSelect = 'swipe-select'
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

export type IPayload = IRatingPayload | ISelectPayload | IPictureSelectPayload | ILongTextPayload | ISwipePayload;
