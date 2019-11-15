import { Observable } from 'rxjs';
import { TokenType } from './models/authentication.model';

interface IAppInfo {
  appAccessToken?: string;
  userAccessToken?: string;
  [others: string]: any;
}

export abstract class TokenStorage {
  public storageType?: TokenType;
  public appInfo: IAppInfo;

  /**
   * Get User Info
   */
  public abstract getAppInfo(): Observable<IAppInfo>;

  /**
   * Get appInfo property
   */
  public abstract getAppInfoProperty(key: string): string | undefined;

  /**
   * Set appInfo property
   */
  public abstract setAppInfoProperty(value: string | number | boolean, key: string): void;

  /**
   * Remove appInfo property
   */
  public abstract clearAppInfoProperty(keys: string[]): void;
}
