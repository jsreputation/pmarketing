export interface PageProperties {
  showHeader(): boolean;
  backButtonEnabled(): boolean;
  bottomSelectedItem(): BAR_SELECTED_ITEM;
}

export enum BAR_SELECTED_ITEM {
  HOME = 'home',
  SEARCH = 'search',
  ACCOUNT = 'account',
  NONE = 'none'
}
