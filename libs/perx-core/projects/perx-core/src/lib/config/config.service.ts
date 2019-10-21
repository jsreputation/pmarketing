import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IConfig, IMicrositeSettings} from './models/config.model';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../auth/authentication/authentication.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {ICustomProperties} from '../profile/profile.model';

interface IV4MicrositeSettingsResponse {
  data: IV4MicrositeSettings;
}

interface IV4MicrositeSettings {
  id: number;
  key: string;
  string_value: string;
  json_value: ICustomProperties;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private appConfig: IConfig;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {

  }

  public static v4MicrositeSettingsToMicrositeSettings(v4Settings: IV4MicrositeSettings): IMicrositeSettings {
    return {
      id: v4Settings.id,
      key: v4Settings.key,
      stringValue: v4Settings.string_value,
      jsonValue: v4Settings.json_value,
    };
  }

  public readAppConfig(): Observable<IConfig> {
    return this.http.get<IConfig>('assets/config/app-config.json').pipe(
      tap((appConfig: IConfig) => this.appConfig = appConfig)
    );
  }

  public getTenantAppSettings(): Observable<IMicrositeSettings> {
    return this.authenticationService.getAppToken().pipe(
      // todo: remove this.appConfig usage and use readAppConfig directly
      switchMap(() => this.http.get(`${this.appConfig.apiHost}/v4/settings/microsite`)),
      map((res: IV4MicrositeSettingsResponse) => res.data),
      map((data: IV4MicrositeSettings) => ConfigService.v4MicrositeSettingsToMicrositeSettings(data))
    );
  }

}
