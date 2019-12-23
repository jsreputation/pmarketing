export interface IWSetting {
  currency: number;
  time_zone: number;
  'theme.accent': string;
  'theme.button_text_color': string;
  'theme.button_background_color': string;
  'theme.font': string;
  'theme.header_color': string;
  'theme.logo': string;
  'theme.primary': string;
  'theme.style': string;
  'theme.title': string;
  'theme.login_background_colour'?: string;
  account: IWPagesObject;
  showHistoryPage: boolean;
  showHomePage: boolean;
}

export interface IWTenant {
  account_id: number;
  alias: string;
  created_at: string;
  name: string;
  display_properties: IWSetting;
}

export interface IWAccountPageObject {
  title: string;
  content_url: string;  // eslint-disable-line
  key: string;
}

export interface IWPagesObject {
  pages: IWAccountPageObject[];
}
