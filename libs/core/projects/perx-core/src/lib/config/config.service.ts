import { Observable } from 'rxjs';

import {
  IConfig,
} from './models/config.model';

export abstract class ConfigService {
  public abstract readAppConfig<T = void>(): Observable<IConfig<T>>;
  public abstract readAppStarted(): boolean;
  public abstract setAppStarted(): void;
}
