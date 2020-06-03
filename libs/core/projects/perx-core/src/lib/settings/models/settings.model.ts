import { TokenType } from '../../utils/storage/models/token-storage.model';

export interface IMicrositeSettings {
  id: number;
  key: string;
  stringValue: string;
  jsonValue: { [key: string]: string | number | boolean | TokenType };
}

export interface IFlags {
  merchantMap?: boolean;
  rewardsCarousel?: boolean;
  rebateDemoFlow?: boolean;
}

export interface IRssFeeds {
  data: IRssFeedsData[];
}

export interface IRssFeedsData {
  url: string;
  page: string;
}

export interface AccountPageObject {
  title: string;
  content_url: string;  // eslint-disable-line
  key?: string; // if not present, the link will be to the page directly, if present, the content will be shown embeded within blackcomb
}

export interface PagesObject {
  pages: AccountPageObject[];
}

export enum RssFeedsPages {
  HOME = 'home',
  WALLET = 'wallet',
  CATALOGS = 'catalogs',
  REWARDS = 'rewards'
}
