
import { Observable } from 'rxjs';
import { IConfig, IMicrositeSettings, PagesObject } from './models/config.model';

export abstract class ConfigService {
  public abstract readAppConfig<T = void>(): Observable<IConfig<T>>;
  public abstract getTenantAppSettings(key: string): Observable<IMicrositeSettings>;
  public abstract getAccountSettings(): Observable<PagesObject>;
}
