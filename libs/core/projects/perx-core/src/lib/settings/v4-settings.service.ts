import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  iif,
  Observable,
  of
} from 'rxjs';
import {
  map,
  share,
  switchMap,
  tap,
} from 'rxjs/operators';

import { IWSetting } from '@perxtech/whistler';

import { IConfig } from '../config/models/config.model';

import { AuthenticationService } from '../auth/authentication/authentication.service';
import { ICustomProperties } from '../profile/profile.model';
import { SettingsService } from './settings.service';
import {
  IMicrositeSettings,
  IRssFeeds,
  PagesObject,
  IFlags,
  GatekeeperApis
} from './models/settings.model';
import { ConfigService } from '../config/config.service';

interface IV4FlagsResponse {
  data: IV4Flags;
}

interface IV4WordPressRssResponse {
  data: IV4WordPressRss;
}

interface IV4Flags {
  id: number;
  key: string;
  string_value: string;
  json_value: {
    merchant_map: boolean;
    rewards_carousel: boolean;
    rebate_demo_flow: boolean;
    gatekeeper_polling_interval: number;
    show_stamp_campaigns: boolean;
    gatekeeper_api: GatekeeperApis;
  };
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
interface IV4GatekeeperResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class V4SettingsService extends SettingsService {
  private settings: any;
  private hostName: string;
  private rssFeeds: IRssFeeds;
  private flags: IFlags;

  private httpBackend: HttpClient;
  constructor(
    private http: HttpClient,
    externalBackend: HttpBackend,
    private configService: ConfigService,
    private authenticationService: AuthenticationService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.hostName = config.apiHost as string;
        this.httpBackend = new HttpClient(externalBackend);
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

  public static v4FlagsToFlags(data: IV4Flags): IFlags {
    return {
      merchantMap: data.json_value.merchant_map,
      rewardsCarousel: data.json_value.rewards_carousel,
      rebateDemoFlow: data.json_value.rebate_demo_flow,
      gatekeeperPollingInterval: data.json_value.gatekeeper_polling_interval,
      showStampCampaigns: data.json_value.show_stamp_campaigns,
      gatekeeperApi: data.json_value.gatekeeper_api,
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

  public getRemoteFlagsSettings(): Observable<IFlags> {
    if (this.flags) {
      return of(this.flags);
    }
    return this.http.get<IV4FlagsResponse>(`${this.hostName}/v4/settings/microsite_feature_flags`).pipe(
      map((res: IV4FlagsResponse) => res.data),
      map((data: IV4Flags) => V4SettingsService.v4FlagsToFlags(data)),
      tap((data: IFlags) => this.flags = data)
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

  public isGatekeeperOpen(): Observable<boolean> {
    // this will return a empty body and angular does not like it.
    const perxGatekeeper = this.http.post<IV4GatekeeperResponse>(`${this.hostName}/v4/gatekeep_token`, null);

    // currently only implemented for prod todo: auth and staging/prod versions
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const awsGatekeeper = this.httpBackend.get<IV4GatekeeperResponse>(
      'https://cors-proxy.perxtech.io/?url=https://80ixbz8jt8.execute-api.ap-southeast-1.amazonaws.com/Prod/gatekeep_token',
      {
        headers
      });
    return this.getRemoteFlagsSettings().pipe(
      switchMap((flags: IFlags) =>
        iif(() => flags.gatekeeperApi === GatekeeperApis.AWS, awsGatekeeper, perxGatekeeper)
      ),
      map((res: IV4GatekeeperResponse) => {
        if (res.message === 'go ahead') {
          return true;
        }
        // false signals that the app should continue holding.
        return false;
      }),
      // expecting a HTTP 429 error to be handled by caller
    );
  }
}
