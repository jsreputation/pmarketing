export interface PageAppearence {
  getPageProperties(): PageProperties;
}

export interface PageProperties {
  header: boolean;
  backButtonEnabled: boolean;
  bottomSelectedItem: BarSelectedItem;
  pageTitle: string;
}

export enum BarSelectedItem {
  HOME = 'home',
  SEARCH = 'search',
  ACCOUNT = 'account',
  NONE = 'none'
}
