import { IVoucher } from '../../vouchers/models/voucher.model';
import { PuzzleCollectReward } from '../../puzzles/models/puzzle-stamp.model';

export interface IReward {
  id: number;
  campaignId: number;
  modularizableType: string;
  modularizableId: number;
  createdAt: string;
  updatedAt: string;
  // ordering: any|null;
  refereeRequiredForReward: number;
  totalRewardLimit: number;
  totalUserLimit: number;
  awardToTeferral: boolean;
  awardToReferee: boolean;
  totalReferreeLimit: number;
  stampNumber: number;
  // totalReferreeReward_limit: any|null;
  // hidden: any|null;
}

export enum StampState {
  redeemed = 'redeemed',
  issued = 'issued',
}

export enum StampCardState {
  completed = 'completed',
  active = 'active',
  inactive = 'inactive'
}

export interface IStamp {
  id: number;
  userAccountId: number;
  stampCardId: number;
  state: StampState;
  createdAt: string;
  updatedAt: string;
  campaignId: number;
  vouchers?: IVoucher[];
}

export interface IStampCard {
  title?: string; // added
  subTitle?: string; // added
  buttonText?: string; // added
  id: number;
  userAccountId?: number; // made optional
  state: StampCardState;
  campaignId?: number; // made optional
  cardNumber?: number; // made optional
  campaignConfig: {
    totalSlots: number;
    rewards?: IReward[];
    collectionRewards?: PuzzleCollectReward[];
  };
  displayProperties: {
    numberOfCols?: number; // made optional
    numberOfRows?: number; // made optional
    cardImage?: { // made optional
      value: {
        imageUrl: string;
      }
    };
    preStampImg?: string;
    postStampImg?: string;
    rewardPreStamp?: string;
    rewardPostStamp?: string;
    bgImage?: string;
    cardBgImage?: string;
    totalSlots?: number;
    displayCampaignAs: string;
    backgroundImg?: {
      value?: {
        imageUrl: string;
      }
    };
    rewardPositions?: number[]
    thumbnailImg?: string;
    noRewardsPopUp?: {
      headLine?: string,
      subHeadLine?: string,
      imageURL?: string,
    };
  };
  stamps?: IStamp[];
}

export interface IDisplayProperties {
  noRewardsPopUp?: {
    headLine?: string,
    subHeadLine?: string,
    imageURL?: string,
    buttonTxt?: string,
  };
}
