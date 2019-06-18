import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class EnvConfig {
  // defaults
  env = {
    apiHost: 'localhost:3000',
    production: false,
    preAuth: false,
    preAuthPath: '/preauth',
    clientId: '',
    clientSecret: ''
  };
}

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  apiHost: string;
  clientId: string;
  clientSecret: string;

  constructor(@Optional() config: EnvConfig, private http: HttpClient) {
    this.apiHost = config.env.apiHost;
    this.clientId = config.env.clientId;
    this.clientSecret = config.env.clientSecret;
  }


  authenticateV4Oauth(user: string, pass: string, mechId: string) {
    const httpParams = new HttpParams()
      .append('username', user)
      .append('password', pass)
      .append('mech_id', mechId)
      .append('client_id', this.clientId)
      .append('client_secret', this.clientSecret);

    return this.http.post(this.apiHost + '/v4/oauth/token', null, {
      params: httpParams
    });
  }
}
