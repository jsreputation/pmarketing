import { IWCampaignDisplayProperties } from '@perx/whistler';

export interface IOutcome {
  title: string;
  button: string;
  subTitle: string;
  banner: string;
  backgroundImgUrl: string;
  cardBackgroundImgUrl: string;
  displayProperties?: IWCampaignDisplayProperties;
}
