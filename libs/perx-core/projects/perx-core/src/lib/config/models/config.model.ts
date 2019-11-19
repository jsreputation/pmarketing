import { TokenType } from '../../utils/storage/models/token-storage.model';

export interface IConfig {
  [key: string]: string | number | boolean | TokenType;
}

export interface IMicrositeSettings {
  id: number;
  key: string;
  stringValue: string;
  jsonValue: {[key: string]: string | number | boolean | TokenType};
}
