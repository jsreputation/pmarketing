export interface PageProperties {
  showHeader(): boolean;
  bottomSelectedItem(): BarSelectedItem;
}

export enum BarSelectedItem {
  HOME = 'home',
  SEARCH = 'search',
  ACCOUNT = 'account',
  NONE = 'none'
}
