import {TokenType} from '../../auth/authentication/models/authentication.model';

export interface IConfig {
  [key: string]: string | number | boolean | TokenType;
}
