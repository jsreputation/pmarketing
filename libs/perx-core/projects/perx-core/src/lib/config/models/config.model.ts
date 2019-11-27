import { TokenType } from '../../utils/storage/models/token-storage.model';
import { IWSetting } from '@perx/whistler';

export interface IConfig {
  baseHref: string;
  [key: string]: string | number | boolean | TokenType | IWSetting;
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
