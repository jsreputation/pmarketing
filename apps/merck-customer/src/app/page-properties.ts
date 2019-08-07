export interface PageProperties {
  showHeader(): boolean;
  backButtonEnabled(): boolean;
  bottomSelectedItem(): BarSelectedItem;
}

export enum BarSelectedItem {
  HOME = 'home',
  SEARCH = 'search',
  ACCOUNT = 'account',
  NONE = 'none'
}
