import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class EnvConfig {
  // defaults
  public env: any = {
    apiHost: 'localhost:3000',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };
}

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  public authEndpoint: string;

  constructor(@Optional() config: EnvConfig, private http: HttpClient) {
    if (!config.env.production) {
      this.authEndpoint = 'http://localhost:4000/v4/oauth';
    } else {
      this.authEndpoint = config.env.baseHref + 'v4/oauth';
    }
  }

  public authenticateV4Oauth(user: string, pass: string, mechId?: string, campaignId?: string): Observable<any> {
    let httpParams = new HttpParams()
      .append('url', location.host)
      .append('username', user)
      .append('password', pass);
    if (mechId) {
      httpParams = httpParams.append('mech_id', mechId);
    }
    if (campaignId) {
      httpParams = httpParams.append('campaign_id', campaignId);
    }

    return this.http.post(this.authEndpoint + '/token', null, {
      params: httpParams
    });
  }

  public authenticateUserIdWithAppBearer(user: string): Observable<any> {
    const httpParams = new HttpParams()
      .append('url', location.host)
      .append('identifier', user);

    return this.http.post(this.authEndpoint + '/token', null, {
      params: httpParams
    });
  }
}
