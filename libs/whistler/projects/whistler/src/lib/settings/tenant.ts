export interface IWTenantAttributes {
  account_id: string;
  alias?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  root_id?: number;
  urn?: string;
  display_properties: IWTenantDisplayProperties;
}

export interface IWTenantDisplayProperties {
  'time_zone': string;
  'theme.color': string;
  'currency': string;
  'theme.style': string;
  'theme.accent': string;
  'theme.button_text_color': string;
  'theme.button_background_color': string;
  'theme.font': string;
  'theme.header_color': string;
  'theme.logo': string;
  'theme.primary': string;
  'theme.title': string;
  'account': IWAccountPage;
  campaign_base_url: string;
}

export interface IWAccountPageItem {
  title: string;
  content_url?: string;
  key: string;
}

export interface IWAccountPage {
  pages: IWAccountPageItem[];
}
