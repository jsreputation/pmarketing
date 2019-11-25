import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IConfig, IMicrositeSettings, PagesObject } from './models/config.model';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { IJsonApiListPayload, IWTenant } from '@perx/whistler';
import { map } from 'rxjs/operators';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class WhistlerConfigService extends ConfigService {
  private settings: any;
  private endpoint: string;

  constructor( private http: HttpClient, config: Config ) {
    super();
    if (!config.production) {
      this.endpoint = 'http://localhost:4000/themes';
    } else {
      this.endpoint = config.baseHref + 'themes';
    }
  }
  public readAppConfig(): Observable<IConfig> {
    return this.http.get<IConfig>('assets/config/app-config.json');
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
