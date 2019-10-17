export interface ITheme {
    name: string;
    properties: IThemeProperties;
}

interface IThemeProperties {
    '--font'?: string;
    '--logo'?: string;
    '--title'?: string;
    '--accent'?: string;
    '--primary'?: string;
    '--button_text_color'?: string;
    '--button_background_color'?: string;
    '--header_color'?: string;
    '--background': string;
    '--font_color': string;
}

export const LIGHT: ITheme = {
    name: 'Light',
    properties: {
        '--background': '#fafafa',
        '--font_color': '#333'
    }
};

export const DARK: ITheme = {
    name: 'Dark',
    properties: {
        '--background': '#1f2935',
        '--font_color': '#fff'
    }
};

export interface WhistlerITenant {
  account_id: string;
  alias: string;
  created_at: string;
  name: string;
  display_properties: WhistlerISetting;
}

export interface AccountPageObject {
  title: string;
  content_url: string;
  key: string;
}

export interface PagesObject {
  pages: AccountPageObject[];
}

export interface WhistlerISetting {
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
  'account': PagesObject;
}
