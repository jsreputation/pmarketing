import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class EnvConfig {
  // defaults
  env = {
    apiHost: 'localhost:3000',
    production: false,
    isWhistler: false,
    preAuth: false,
  };
}

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  authEndpoint: string;

  constructor(@Optional() config: EnvConfig, private http: HttpClient) {
    if (!config.env.production) {
      this.authEndpoint = 'http://localhost:4000/v4/oauth';
    } else {
      this.authEndpoint = '/v4/oauth';
    }
  }


  authenticateV4Oauth(user: string, pass: string, mechId: string, campaignId: string) {
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

  authenticateUserIdWithAppBearer(user: string) {
    const httpParams = new HttpParams()
      .append('url', location.host)
      .append('username', user);

    return this.http.post(this.authEndpoint + '/token', null, {
      params: httpParams
    });
  }
}
