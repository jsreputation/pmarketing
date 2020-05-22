import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  of,
} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  IJsonApiListPayload,
  IWTenant,
} from '@perxtech/whistler';

import {
  IMicrositeSettings,
  IRssFeeds,
  PagesObject,
} from './models/settings.model';
import { SettingsService } from './settings.service';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';

@Injectable({
  providedIn: 'root'
})
export class WhistlerSettingsService extends SettingsService {
  private settings: any;
  private endpoint: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        if (!config.production) {
          this.endpoint = 'http://localhost:4000/themes';
        } else {
          this.endpoint = `${config.baseHref}themes`;
        }
      }
    );
  }

  public readRssFeeds(): Observable<IRssFeeds> {
    return this.http.get<IRssFeeds>('assets/config/RSS_FEEDS.json');
  }

  public getRssFeeds(): Observable<IRssFeeds> {
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

  public isHoldingState(): Observable<boolean> {
    throw new Error('isHoldingState Method not implemented.');
  }
}
