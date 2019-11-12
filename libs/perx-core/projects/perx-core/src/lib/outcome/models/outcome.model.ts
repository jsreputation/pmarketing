import { ICampaignDisplayProperties } from '../../perx-core.models';

export interface IOutcome {
  title: string;
  button: string;
  subTitle: string;
  banner: string;
  backgroundImgUrl: string;
  cardBackgroundImgUrl: string;
  displayProperties?: ICampaignDisplayProperties;
}
