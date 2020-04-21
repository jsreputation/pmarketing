import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  of,
  Observable,
} from 'rxjs';
import {
  map,
  share,
  switchMap,
  tap,
} from 'rxjs/operators';

import { IWSetting } from '@perxtech/whistler';

import {
  IConfig
} from '../config/models/config.model';

import { AuthenticationService } from '../auth/authentication/authentication.service';
import { ICustomProperties } from '../profile/profile.model';
import { SettingsService } from './settings.service';
import { IMicrositeSettings, IRssFeeds, PagesObject } from './models/settings.model';
import { ConfigService } from '../config/config.service';

interface IV4WordPressRssResponse {
  data: IV4WordPressRss;
}

interface IV4WordPressRss {
  id: number;
  key: string;
  string_value: string;
  json_value: {
    blog_section: {
      url: string;
      section: string;
    }[]
  };
}

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
export class V4SettingsService extends SettingsService {
  private settings: any;
  private hostName: string;
  private rssFeeds: IRssFeeds;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private authenticationService: AuthenticationService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
      });
  }

  public static v4MicrositeSettingsToMicrositeSettings(v4Settings: IV4MicrositeSettings): IMicrositeSettings {
    return {
      id: v4Settings.id,
      key: v4Settings.key,
      stringValue: v4Settings.string_value,
      jsonValue: v4Settings.json_value,
    };
  }

  public static v4WordPressRssToRss(data: IV4WordPressRss): IRssFeeds {
    const newIRssFeeds: IRssFeeds = { data: [] };
    data.json_value.blog_section.forEach(rssSection => {
      newIRssFeeds.data.push({
        url: rssSection.url,
        page: rssSection.section
      });
    });
    return newIRssFeeds;
  }

  public readRssFeeds(): Observable<IRssFeeds> {
    return this.http.get<IRssFeeds>('assets/config/RSS_FEEDS.json');
  }

  public getRssFeeds(): Observable<IRssFeeds> {
    if (this.rssFeeds) {
      return of(this.rssFeeds);
    }
    return this.http.get<IV4WordPressRssResponse>(`${this.hostName}/v4/settings/wordpress`).pipe(
      map((res: IV4WordPressRssResponse) => res.data),
      map((data: IV4WordPressRss) => V4SettingsService.v4WordPressRssToRss(data)),
      tap((data: IRssFeeds) => this.rssFeeds = data)
    );
  }

  public getTenantAppSettings(key: string): Observable<IMicrositeSettings> {

    if (this.settings) {
      return of(this.settings);
    }

    return this.authenticationService.getAppToken().pipe(
      switchMap(() => this.http.get(`${this.hostName}/v4/settings/${key}`)),
      map((res: IV4MicrositeSettingsResponse) => res.data),
      map((data: IV4MicrositeSettings) => V4SettingsService.v4MicrositeSettingsToMicrositeSettings(data)),
      share()
    );
  }

  public getAccountSettings<T>(): Observable<PagesObject> {
    return this.configService.readAppConfig<T>().pipe(
      map(res => res.displayProperties),
      map((displayProps: IWSetting) => displayProps && displayProps.account ? displayProps.account : { pages: [] }),
      map((account) => this.settings = account)
    );
  }
}
