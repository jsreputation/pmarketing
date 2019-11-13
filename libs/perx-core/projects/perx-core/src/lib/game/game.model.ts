import { IVoucher } from '../vouchers/models/voucher.model';
import { IWCampaignDisplayProperties } from '@perx/whistler';

export enum GameType {
  unknown = -1,
  shakeTheTree = 'shake',
  pinata = 'tap',
  scratch = 'scratch',
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
  config: ITree | IPinata | IScratch;
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
    underlyingImg: '',
    uncoverPortionToTrigger: 90,
    nbTaps: 5
  };
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
  coverImg: string;
  underlyingImg: string;
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
