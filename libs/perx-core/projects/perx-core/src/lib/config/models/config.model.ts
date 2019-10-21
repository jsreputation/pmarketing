import {TokenType} from '../../auth/authentication/models/authentication.model';

export interface IConfig {
  [key: string]: string | number | boolean | TokenType;
}

export interface IMicrositeSettings {
  id: number;
  key: string;
  stringValue: string;
  jsonValue: {[key: string]: string | number | boolean | TokenType};
}
