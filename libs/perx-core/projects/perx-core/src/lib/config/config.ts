import { TokenType } from '../utils/storage/models/token-storage.model';

export abstract class Config {
  public apiHost?: string;
  public preAuth?: boolean;
  public isWhistler?: boolean;
  public baseHref?: string;
  public production?: boolean;
  public defaultLang?: string;
  public overWriteHeaderShow?: boolean;
  public storageType?: TokenType;
}
