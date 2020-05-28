import { Observable } from 'rxjs';

import {
  IMicrositeSettings,
  IRssFeeds,
  PagesObject
} from './models/settings.model';

export abstract class SettingsService {
  public abstract readRssFeeds(): Observable<IRssFeeds>;
  public abstract getRssFeeds(): Observable<IRssFeeds>;
  public abstract getTenantAppSettings(key: string): Observable<IMicrositeSettings>;
  public abstract getAccountSettings(): Observable<PagesObject>;
  public abstract isGatekeeperOpen(): Observable<boolean>;
}
