import { IWCampaignDisplayProperties } from '@perxtech/whistler';
import { ILongTextPayload } from '../question/long-text/long-text.component';
import { IPictureSelectPayload } from '../question/picture-select/picture-select.component';
import { IRatingPayload } from '../question/rating/rating.component';
import { ISelectPayload } from '../question/select/select.component';
import { ISwipePayload } from '../question/swipe-list/swipe-list.component';
import { IQQuestion } from '../quiz.service';
import { IVoucher } from '../../vouchers/models/voucher.model';
import { IPrizeSetOutcome } from '../../prize-set-outcome/models/prize-set-outcome.model';
import { IBadgeOutcome, IPointsOutcome } from '../../campaign/models/campaign.model';

export interface IQAnswer {
  questionId: string;
  content: (string | number)[];
  timeTaken?: number; // in seconds
}

export interface IQuizScore {
  questionId: string;
  time?: number;
  question: string;
  score?: number;
}

export interface IDateRange {
  from: string;
  to: string;
}

export interface ITracker<T = any> {
  [key: string]: T;
}

export enum MaterialColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}

export interface IQuizOutcome {
  // suppose to be { [lang: string]: {text: string} }, but leave it be first
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
  title?: {text: string};
  subTitle?: {text: string};
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
  timeConfig: ITimeConfig;
  ctaButtonBGColor?: string | undefined;
  ctaButtonTextColor?: string | undefined;
  fontColor?: string | undefined;
}

export interface ITimeConfig {
  timerCountSeconds?: number;
  timerType?: TimerType;
}

export enum TimerType {
  countDown = 'count_down',
  countUp = 'count_up'
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

export interface IQuizResultOutcome {
  rewardAcquired: boolean;
  vouchers?: IVoucher[];
  points?: IPointsOutcome[];
  prizeSets?: IPrizeSetOutcome[];
  badges?: IBadgeOutcome[];
}
