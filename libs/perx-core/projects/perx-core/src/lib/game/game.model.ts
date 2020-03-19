import { IVoucher } from '../vouchers/models/voucher.model';
import { IWCampaignDisplayProperties } from '@perxtech/whistler';

export enum GameType {
  unknown = -1,
  shakeTheTree = 'shake',
  pinata = 'tap',
  scratch = 'scratch',
  spin = 'spin',
  snake = 'snake'
}

export interface IEngagementTransaction {
  id: number;
  voucherIds?: number[];
  rewardIds?: number[];
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
  type: GameType;
  remainingNumberOfTries: number;
  config: ITree | IPinata | IScratch | ISpin | ISnake | null;
  backgroundImg?: string;
  texts: {
    title?: string;
    subTitle?: string;
    button?: string;
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
    rewardSlots: [2, 4],
    colorCtrls: {
      0: 'red',
      1: 'yellow',
      2: 'green',
      3: 'blue',
      4: 'black'
    },
    rewardIcon: '',
    wheelImg: '',
    wheelPosition: '',
    pointerImg: '',
    background: ''
  };
}

export interface ISpin {
  numberOfWedges: number;
  rewardSlots: number[];
  colorCtrls: { [index: number]: string };
  rewardIcon: string;
  wheelImg: string;
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

export interface IPlayOutcome {
  vouchers: IVoucher[];
  rawPayload: any;
}

export interface ISlice {
  id: string;
  label?: string;
  labelColor?: string;
  backgroundColor?: string;
  backgroundImage?: string;
}
