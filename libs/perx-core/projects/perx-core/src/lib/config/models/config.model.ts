import { IWSetting } from '@perxtech/whistler';

export interface IConfig<T> {
  apiHost: string;
  production: boolean;
  preAuth: boolean;
  isWhistler: boolean;
  baseHref: string;
  defaultLang?: string;
  sourceType?: string;
  custom?: T;
  displayProperties?: IWSetting;
  showAccountsPage?: boolean;
  showHistoryPage?: boolean;
  showHomePage?: boolean;
  showExpiryOnRewardDetail?: boolean;
  showNewsfeedOnHomepage?: boolean;
  showQrPageSubtitle?: boolean;
  showUserQR?: boolean;
  showBarcodeOnHomeProfilePage?: boolean;
  showSubtitleLogin?: boolean;
  redirectAfterLogin?: string;
  showUserInfoOnAccountsPage?: boolean;
  showTransactionHistoryOnAccountsPage?: boolean;
  showVoucherBookingFromRewardsPage?: boolean;
}
