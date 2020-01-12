declare interface ITenant {
  id: string;
  name?: string;
  account_id?: string;
  time_zone: number;
  'theme.color': string;
  currency: any;
  'theme.style': string;
  'theme.accent': string;
  'theme.button_text_color': string;
  'theme.button_background_color': string;
  'theme.font': string;
  'theme.header_color': string;
  'theme.logo': string;
  'theme.primary': string;
  'theme.title'?: boolean;
  account: PagesObject;
  campaign_base_url: string;
}

declare interface AccountPageObject {
  title: string;
  content_url: string;
  key: string;
}
declare interface PagesObject {
  pages: AccountPageObject[];
}
