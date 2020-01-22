import { Observable } from 'rxjs';

import {
  IConfig,
  IMicrositeSettings,
  IRssFeeds,
  PagesObject,
} from './models/config.model';

export abstract class ConfigService {
  public abstract readAppConfig<T = void>(): Observable<IConfig<T>>;
  public abstract readRssFeeds(): Observable<IRssFeeds>;
  public abstract getTenantAppSettings(key: string): Observable<IMicrositeSettings>;
  public abstract getAccountSettings(): Observable<PagesObject>;
}
