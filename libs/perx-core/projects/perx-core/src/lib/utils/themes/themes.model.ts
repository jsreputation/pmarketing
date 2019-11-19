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
    'showHomePage'?: boolean;
    'showSubtitleLogin'?: boolean;
    'showHistoryPage'?: boolean;
    'showNewsfeedOnHomepage'?: boolean;
    'showQrPageSubtitle'?: boolean;
    '--login_background_colour'?: string;
    'stampCard'?: IStampCardTheme;
}

interface IStampCardTheme {
  '--pre_stamp_image'?: string;
  '--post_stamp_image'?: string;
  '--reward_pre_stamp_image'?: string;
  '--reward_post_stamp_image'?: string;
  '--available_stamp_image'?: string;
  '--available_reward_image'?: string;
  '--background_image'?: string;
  '--card_background_image'?: string;
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

export interface AccountPageObject {
  title: string;
  content_url: string;  // eslint-disable-line
  key: string;
}

export interface PagesObject {
  pages: AccountPageObject[];
}
