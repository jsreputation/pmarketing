import { IWCampaignDisplayProperties } from '../../public-api';

export interface IWInstantOutcomeDisplayProperties {
  title: string;
  button: string;
  sub_title: string;
  banner: string;
  background_img_url: string;
  card_background_img_url: string;
  displayProperties?: IWCampaignDisplayProperties;
}
