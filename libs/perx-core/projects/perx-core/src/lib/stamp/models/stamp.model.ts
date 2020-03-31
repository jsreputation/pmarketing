import { IVoucher } from '../../vouchers/models/voucher.model';
import { PuzzleCollectReward } from '../../puzzles/models/puzzle-stamp.model';
import { IWProperties } from '@perxtech/whistler';

export interface ICampaignOutcome {
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

export interface ICampaignConfig {
  totalSlots: number;
  rewards?: ICampaignOutcome[];
  collectionRewards?: PuzzleCollectReward[];
}

export interface IStampCardOutcome {
  title: string;
  subTitle: string;
  image?: string;
  button: string;
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
  campaignConfig: ICampaignConfig | null | undefined;
  results: {
    outcome?: IStampCardOutcome;
    noOutcome?: IStampCardOutcome;
  };
  displayProperties: {
    numberOfCols?: number; // made optional
    numberOfRows?: number; // made optional
    cardImage?: { // made optional
      value: {
        imageUrl: string;
      }
    };
    //  todo: temporarily map this until v4 dashboard fixes naming
    cardBackgroundImage?: { // made optional
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
        imageUrl: string | null;
      }
    };
    rewardPositions?: number[]
    thumbnailImg?: string;
    noRewardsPopUp?: IWProperties;
    successPopUp?: IWProperties;
  };
  stamps?: IStamp[];
}
