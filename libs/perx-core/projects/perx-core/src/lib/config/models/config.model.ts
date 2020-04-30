import { IWSetting } from '@perxtech/whistler';

export interface IConfig<T> {
  app?: string;
  apiHost: string;
  production: boolean;
  preAuth: boolean;
  isWhistler: boolean;
  baseHref: string;
  defaultLang?: string;
  sourceType?: string;
  custom?: T;
  displayProperties?: IWSetting;

  /* login page flags */
  countryCodePrefix?: string;

  /* home page flags */
  showHomePage?: boolean;
  showNewsfeedOnHomepage?: boolean;
  showBarcodeOnHomeProfilePage?: boolean;
  showLoyaltyBlockOnHomePage?: boolean;
  showLoyaltyProgress?: boolean;
  showCatalogOnHomePage?: boolean;
  showQuizOnHomePage?: boolean;
  showCampaignRewardsCounterOnHomepage?: boolean;
  showRewardsOnHomepage?: boolean;
  showCampaignLandingPage?: boolean;
  showLeaderboardPage?: boolean;

  /* Misc */
  showQrPageSubtitle?: boolean;
  showUserQR?: boolean;
  showHistoryPage?: boolean;

  /* Login page */
  showSubtitleLogin?: boolean;
  redirectAfterLogin?: string;
  redirectBeforeLogin?: string; // this is used for routing the user on the landing page before login
  showForgetPasswordOnLogin?: boolean;

  /* Account page */
  showAccountsPage?: boolean;
  showUserInfoOnAccountsPage?: boolean;
  showLuckyDrawDetailsOnAccountsPage?: boolean;
  showTransactionHistoryOnAccountsPage?: boolean;
  showReferralOnAccountsPage?: boolean;

  /* Reward page */
  showVoucherBookingFromRewardsPage?: boolean;
  showExpiryOnRewardDetail?: boolean;
}
