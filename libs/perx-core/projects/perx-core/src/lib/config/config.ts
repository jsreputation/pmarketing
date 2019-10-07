import { TokenType } from '../auth/authentication/models/authentication.model';

export abstract class Config {
  public apiHost?: string;
  public preAuth?: boolean;
  public isWhistler?: boolean;
  public baseHref?: string;
  public production?: boolean;
  public defaultLang?: string;
  public storageType?: TokenType;
}
