
import { Observable } from 'rxjs';
import { IConfig, IMicrositeSettings } from './models/config.model';

export abstract class ConfigService {
  public abstract readAppConfig(): Observable<IConfig>;
  public abstract getTenantAppSettings(key: string): Observable<IMicrositeSettings>;
}
