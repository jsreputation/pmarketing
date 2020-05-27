import { IWCampaignDisplayProperties } from '@perxtech/whistler';

export interface IOutcome {
  title: string;
  button: string;
  subTitle: string;
  banner: string;
  backgroundImgUrl: string;
  cardBackgroundImgUrl: string;
  results: {
    noOutcome?: IOutcomeMsg;
  };
  displayProperties?: IWCampaignDisplayProperties;
}

export interface IOutcomeMsg {
  title: string;
  subTitle: string;
  image?: string;
  button: string;
}
