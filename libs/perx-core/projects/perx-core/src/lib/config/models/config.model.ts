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


  /* home page flags */
  showHomePage?: boolean;
  showNewsfeedOnHomepage?: boolean;
  showBarcodeOnHomeProfilePage?: boolean;
  showLoyaltyBlockOnHomePage?: boolean;
  showCatalogOnHomePage?: boolean;
  showQuizOnHomePage?: boolean;
  showCampaignRewardsCounterOnHomepage?: boolean;
  showRewardsOnHomepage?: boolean;
  showCampaignLandingPage?: boolean;

  /* Misc */
  showQrPageSubtitle?: boolean;
  showUserQR?: boolean;
  showHistoryPage?: boolean;

  /* Login page */
  showSubtitleLogin?: boolean;
  redirectAfterLogin?: string;
  showForgetPasswordOnLogin?: boolean;

  /* Account page */
  showAccountsPage?: boolean;
  showUserInfoOnAccountsPage?: boolean;
  showTransactionHistoryOnAccountsPage?: boolean;

  /* Reward page */
  showVoucherBookingFromRewardsPage?: boolean;
  showExpiryOnRewardDetail?: boolean;
}
