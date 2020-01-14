import { TokenType } from '../../utils/storage/models/token-storage.model';
import { IWSetting } from '@perx/whistler';

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
  comingSoon?: boolean;
}

export interface IMicrositeSettings {
  id: number;
  key: string;
  stringValue: string;
  jsonValue: { [key: string]: string | number | boolean | TokenType };
}

export interface AccountPageObject {
  title: string;
  content_url: string;  // eslint-disable-line
  key: string;
}

export interface PagesObject {
  pages: AccountPageObject[];
}
