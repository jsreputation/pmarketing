import { IWCampaignDisplayProperties } from '@perxtech/whistler';
import { IDatePayload } from '../question/date/date.component';
import { IGroupPayload } from '../question/group/group.component';
import { ILongTextPayload } from '../question/long-text/long-text.component';
import { IPasswordPayload } from '../question/password/password.component';
import { IPhonePayload } from '../question/phone/phone.component';
import { IPictureSelectPayload } from '../question/picture-select/picture-select.component';
import { IRatingPayload } from '../question/rating/rating.component';
import { ISelectPayload } from '../question/select/select.component';

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

export type IPayload =
  ISelectPayload |
  IRatingPayload |
  IGroupPayload |
  IDatePayload |
  ILongTextPayload |
  IPasswordPayload |
  IPhonePayload |
  IPictureSelectPayload;
