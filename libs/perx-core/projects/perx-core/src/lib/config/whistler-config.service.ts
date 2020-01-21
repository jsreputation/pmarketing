import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  of,
} from 'rxjs';
import { map } from 'rxjs/operators'

import {
  IJsonApiListPayload,
  IWTenant,
  IWSetting,
} from '@perx/whistler';

import {
  IConfig,
  IMicrositeSettings,
  IRssFeeds,
  PagesObject,
} from './models/config.model';
import { ConfigService } from './config.service';;
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class WhistlerConfigService extends ConfigService {
  private settings: any;
  private endpoint: string;

  constructor(private http: HttpClient, private config: Config) {
    super();
    if (!this.config.production) {
      this.endpoint = 'http://localhost:4000/themes';
    } else {
      this.endpoint = `${this.config.baseHref}themes`;
    }
  }

  private static WTenantToConfig<T>(setting: IWSetting, config: Config): IConfig<T> {
    return {
      showHistoryPage: setting.showHistoryPage || true,
      showHomePage: setting.showHomePage || false,
      showAccountsPage: setting.showAccountsPage || false,
      showUserInfoOnAccountsPage: setting.showUserInfoOnAccountsPage || false,
      // showSubtitleLogin: setting.showSubtitleLogin || false,
      // showNewsfeedOnHomepage: setting.showNewsfeedOnHomepage || false,
      // showQrPageSubtitle: setting.showQrPageSubtitle || false,
      // showExpiryOnRewardDetail: setting.showExpiryOnRewardDetail || true,
      // showUserInfoOnAccountsPage: setting.showUserInfoOnAccountsPage || false,
      // showTransactionHistoryOnAccountsPage: setting.showTransactionHistoryOnAccountsPage || false
      production: config.production || false,
      baseHref: config.baseHref || '/',
      apiHost: config.apiHost || '',
      preAuth: config.preAuth || false,
      isWhistler: config.isWhistler || false,
    };
  }

  public readAppConfig<T>(): Observable<IConfig<T>> {
    // mostly copy from theme service
    const themesRequest: { url: string } = {
      url: location.host
    };

    return this.http.post<IJsonApiListPayload<IWTenant>>(this.endpoint, themesRequest)
      .pipe(
        map(res => res.data && res.data[0].attributes.display_properties),
        map((setting) => WhistlerConfigService.WTenantToConfig(setting, this.config)),
      );
  }

  public readRssFeeds(): Observable<IRssFeeds> {
    return this.http.get<IRssFeeds>('assets/config/RSS_FEEDS.json');
  }

  public getTenantAppSettings(): Observable<IMicrositeSettings> {
    return of();
  }

  public getAccountSettings(): Observable<PagesObject> {
    if (this.settings) {
      return of(this.settings);
    }
    const accountSettingRequest: { url: string } = {
      url: location.host
    };
    return this.http.post<IJsonApiListPayload<IWTenant>>(this.endpoint, accountSettingRequest).pipe(
      map(res => res.data && res.data[0].attributes.display_properties),
      map((displayProps) => displayProps.account || { pages: [] }),
      map((account) => this.settings = account)
    );
  }
}
