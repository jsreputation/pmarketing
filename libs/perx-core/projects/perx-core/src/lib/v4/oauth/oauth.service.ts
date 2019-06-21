import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class EnvConfig {
  // defaults
  env = {
    apiHost: 'localhost:3000',
    production: false,
    preAuth: false,
    preAuthPath: '/preauth',
  };
}

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  apiHost: string;
  authHost: string;

  constructor(@Optional() config: EnvConfig, private http: HttpClient) {
    this.apiHost = config.env.apiHost;
    this.authHost = 'http://localhost:4000';
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

    return this.http.post(this.authHost + '/v4/oauth/token', null, {
      params: httpParams
    });
  }

  authenticateUserIdWithAppBearer(user: string) {
    const httpParams = new HttpParams()
      .append('url', location.host)
      .append('username', user);

    return this.http.post(this.authHost + '/v4/oauth/token', null, {
      params: httpParams
    });
  }
}
