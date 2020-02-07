import { TokenType } from '../../utils/storage/models/token-storage.model';

export interface IMicrositeSettings {
  id: number;
  key: string;
  stringValue: string;
  jsonValue: { [key: string]: string | number | boolean | TokenType };
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
  key: string;
}

export interface PagesObject {
  pages: AccountPageObject[];
}
