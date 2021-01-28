import { IVoucher } from '../vouchers/models/voucher.model';
import { IWCampaignDisplayProperties } from '@perxtech/whistler';
import { OutcomeType } from '../outcome/models/outcome.model';

export enum GameType {
  unknown = -1,
  shakeTheTree = 'shake',
  pinata = 'tap',
  scratch = 'scratch',
  spin = 'spin',
  snake = 'snake',
  quiz = 'quiz',
  survey = 'survey'
}

export interface IEngagementTransaction {
  id: number;
  voucherIds?: number[];
  rewardIds?: number[];
  points?: IPointsOutcome[];
}
export interface IGameOutcome {
  title: string;
  subTitle: string;
  image?: string;
  button: string;
}
export interface IGame {
  id: number;
  campaignId?: number;
  campaignName?: string;
  campaignDescription?: string;
  type: GameType;
  remainingNumberOfTries: number;
  config: ITree | IPinata | IScratch | ISpin | ISnake | null;
  backgroundImg?: string;
  texts: {
    title?: string;
    subTitle?: string;
    button?: string;
    buttonColour?: string;
    buttonTextColour?: string;
    headerColour?: string;
    subheaderColour?: string;
  };
  results: {
    outcome?: IGameOutcome;
    noOutcome?: IGameOutcome;
  };
  imgUrl?: string;
  displayProperties?: IWCampaignDisplayProperties;
}

export function defaultTree(): ITree {
  return {
    nbHangedGift: 6,
    nbGiftsToDrop: 6,
    nbTaps: 5,
    treeImg: '',
    giftImg: ''
  };
}

export function defaultPinata(): IPinata {
  return {
    stillImg: '',
    brokenImg: '',
    nbTaps: 5
  };
}

export function defaultScratch(): IScratch {
  return {
    coverImg: '',
    underlyingFailImg: '',
    underlyingSuccessImg: '',
    uncoverPortionToTrigger: 60,
    nbTaps: 5
  };
}

export function defaultSnake(): ISnake {
  return {
    snakeHead: '',
    snakeBody: '',
    background: '',
    targetIcon: '',
    gameArea: '',
    targetRequired: 5
  };
}

export function defaultSpin(): ISpin {
  return {
    numberOfWedges: 5,
    rewardSlots: [],
    slices: [{
      id: 0,
      backgroundColor: 'blue',
      backgroundImage: ''
    }],
    wheelImg: '',
    wheelPosition: '',
    pointerImg: '',
    background: ''
  };
}

export interface ISpin {
  numberOfWedges: number;
  rewardSlots: number[];
  slices: ISlice[];
  wheelImg: string; // diff from rimimage but hvnt implemented yet, will use rim 4 nw
  wheelPosition: string;
  pointerImg: string;
  background: string;
}

export interface ISnake {
  snakeHead: string; // snakeWholeImage copy colorCtrls
  snakeBody?: string;
  background: string;
  targetIcon: string;
  gameArea: string;
  targetRequired: number;
}

export interface ITree {
  stillImg?: string;
  openedImg?: string;
  treeImg: string;
  giftImg: string;
  waitingAccessoryImg?: string;
  celebratingAccessoryImg?: string;
  nbHangedGift: number;
  nbGiftsToDrop: number;
  nbTaps: number;
}

export interface IPinata {
  openedImg?: string;
  stillImg: string;
  breakingImg?: string;
  brokenImg: string;
  nbTaps: number;
}

export interface IScratch {
  coverImg?: string;
  underlyingSuccessImg?: string;
  underlyingFailImg?: string;
  uncoverPortionToTrigger: number;
  nbTaps: number;
}

export interface IPointsOutcome {
  id: number;
  outcomeType: OutcomeType.points;
  points: number;
  properties: any;
}

export interface IPlayOutcome {
  vouchers?: IVoucher[];
  points?: IPointsOutcome[];
  rawPayload: any;
}

export interface ISlice {
  id: number;
  label?: string;
  labelColor?: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

export enum Error400States {
  move = 'Move limit has reached',
  balance = 'Not enough points balance'
}
