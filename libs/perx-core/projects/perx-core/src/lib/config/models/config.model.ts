import { TokenType } from '../../utils/storage/models/token-storage.model';
import { ICSetting } from '../../settings/display';

export interface IConfig<T> {
  apiHost: string;
  production: boolean;
  preAuth: boolean;
  isWhistler: boolean;
  baseHref: string;
  defaultLang?: string;
  sourceType?: string;
  custom?: T;
  displayProperties?: ICSetting;
  showHistoryPage?: boolean;
  showHomePage?: boolean;
  showExpiryOnRewardDetail?: boolean;
  showNewsfeedOnHomepage?: boolean;
  showQrPageSubtitle?: boolean;
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
