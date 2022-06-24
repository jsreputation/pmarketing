import { IVoucher } from '../../vouchers/models/voucher.model';
import { PuzzleCollectReward } from '../../puzzles/models/puzzle-stamp.model';
import { IWProperties } from '@perxtech/whistler';
import { CampaignOutcomeType, ICampaignOutcome } from '../../campaign/models/campaign.model';

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
  outcomes?: IStampOutcome[];
}

export interface IStampOutcome {
  actualOutcomeId: number;
  outcomeType: CampaignOutcomeType;
  state: string;
  prizeId: number;
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
  teamId?: number;
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
    buttonBgColour?: string;
    buttonTextColour?: string;
    riskDisclaimer?: string;
  };
  stamps?: IStamp[];
}

