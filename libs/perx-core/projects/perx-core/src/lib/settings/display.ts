export interface ICSetting {
  currency: number;
  time_zone: number; // eslint-disable-line
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
  account: ICPagesObject;
  showHistoryPage: boolean;
  showHomePage: boolean;
}

export interface ICAccountPageObject {
  title: string;
  content_url: string;  // eslint-disable-line
  key: string;
}

export interface ICPagesObject {
  pages: ICAccountPageObject[];
}
