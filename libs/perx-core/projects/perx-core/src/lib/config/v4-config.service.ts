import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  of,
  Observable,
} from 'rxjs';
import {
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { IWSetting } from '@perx/whistler';

import {
  IConfig,
  IMicrositeSettings,
  IRssFeeds,
  PagesObject,
} from './models/config.model';
import { ConfigService } from './config.service';

import { AuthenticationService } from '../auth/authentication/authentication.service';
import { ICustomProperties } from '../profile/profile.model';

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
export class V4ConfigService extends ConfigService {
  private appConfig: IConfig<{}>;
  private settings: any;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    super();
  }

  public static v4MicrositeSettingsToMicrositeSettings(v4Settings: IV4MicrositeSettings): IMicrositeSettings {
    return {
      id: v4Settings.id,
      key: v4Settings.key,
      stringValue: v4Settings.string_value,
      jsonValue: v4Settings.json_value,
    };
  }

  public readAppConfig<T>(): Observable<IConfig<T>> {
    return this.http.get<IConfig<T>>('assets/config/app-config.json').pipe(
      tap((appConfig: IConfig<T>) => this.appConfig = appConfig)
    );
  }

  public readRssFeeds(): Observable<IRssFeeds> {
    return this.http.get<IRssFeeds>('assets/config/RSS_FEEDS.json');
  }

  public getTenantAppSettings(key: string): Observable<IMicrositeSettings> {

    if (this.settings) {
      return of(this.settings);
    }

    return this.authenticationService.getAppToken().pipe(
      // todo: remove this.appConfig usage and use readAppConfig directly
      switchMap(() => this.http.get(`${this.appConfig.apiHost}/v4/settings/${key}`)),
      map((res: IV4MicrositeSettingsResponse) => res.data),
      map((data: IV4MicrositeSettings) => V4ConfigService.v4MicrositeSettingsToMicrositeSettings(data))
    );
  }

  public getAccountSettings<T>(): Observable<PagesObject> {
    return this.http.get<IConfig<T>>('assets/config/app-config.json').pipe(
      map(res => res.displayProperties),
      map((displayProps: IWSetting) => displayProps && displayProps.account ? displayProps.account : { pages: [] }),
      map((account) => this.settings = account)
    );
  }
}
