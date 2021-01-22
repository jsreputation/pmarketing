import { IWSetting } from '@perxtech/whistler';

export enum LoginType {
  phone = 'phone',
  email = 'email',
  username = 'username',
}

export interface IConfig<T> {
  app?: string;
  apiHost: string;
  production: boolean;
  preAuth: boolean;
  isWhistler: boolean;
  baseHref: string;
  defaultLang?: string;
  sourceType?: string;
  appVersion?: string;
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
  showSurveyOnHomePage?: boolean;
  showCampaignRewardsCounterOnHomepage?: boolean;
  showRewardsOnHomepage?: boolean;
  showCampaignLandingPage?: boolean;
  showLeaderboardPage?: boolean;
  hidePopupCampaign?: boolean;
  showReferralCampaignsOnHomePage?: boolean;
  showStampCampaignsOnHomePage?: boolean;
  showExtraLoyaltyOnHomePage?: boolean;

  /* Misc */
  showQrPageSubtitle?: boolean;
  showUserQR?: boolean;
  showHistoryPage?: boolean;
  showNearMePage?: boolean;

  /* Login page */
  showSubtitleLogin?: boolean;
  redirectAfterLogin?: string;
  redirectBeforeLogin?: string; // this is used for routing the user on the landing page before login
  showForgetPasswordOnLogin?: boolean;
  loginMethod?: LoginType;

  /* Account page */
  showAccountsPage?: boolean;
  showUserInfoOnAccountsPage?: boolean;
  showLuckyDrawDetailsOnAccountsPage?: boolean;
  showTransactionHistoryOnAccountsPage?: boolean;

  /* Reward page */
  showVoucherBookingFromRewardsPage?: boolean;
  showExpiryOnRewardDetail?: boolean;
  showRewardFavButton?: boolean;
  showMacaronOnRewardDetails?: boolean;

  /* For Razer */
  homeAsProgressPage?: boolean;

  /* Sign up page*/
  showLogo?: boolean;

  /* Referral*/
  showReferralDetails?: boolean;
}
