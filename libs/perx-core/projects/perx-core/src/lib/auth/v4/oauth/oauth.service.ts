import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IProfile } from '../../../profile/profile.model';
import { ISignUpRequestData } from '../../authentication/models/authentication.model';
import { V4ProfileService, IV4ProfileResponse } from '../../../profile/v4-profile.service';

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
  public appAuthEndPoint: string;
  public userAuthEndPoint: string;
  public customersEndPoint: string;

  constructor(@Optional() config: EnvConfig, private http: HttpClient) {
    if (!config.env.production) {
      this.appAuthEndPoint = 'http://localhost:4000/v2/oauth';
      this.userAuthEndPoint = 'http://localhost:4000/v4/oauth';
      this.customersEndPoint = 'http://localhost:4000/v4/customers';
    } else {
      this.appAuthEndPoint = config.env.baseHref + 'v2/oauth';
      this.userAuthEndPoint = config.env.baseHref + 'v4/oauth';
      this.customersEndPoint = config.env.baseHref + 'v4/customers';
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

    return this.http.post(this.userAuthEndPoint + '/token', null, {
      params: httpParams
    });
  }

  public authenticateUserIdWithAppBearer(user: string): Observable<any> {
    const httpParams = new HttpParams()
      .append('url', location.host)
      .append('identifier', user);

    return this.http.post(this.userAuthEndPoint + '/token', null, {
      params: httpParams
    });
  }

  public getAppAccessToken(): Observable<any> {
    const httpParams = new HttpParams()
      .append('url', location.host);
    return this.http.post(this.appAuthEndPoint + '/token', null, {
      params: httpParams
    });
  }

  public forgotPassword(phone: string): Observable<any> {
    return this.http.get<{ message: string }>(
      this.customersEndPoint + '/forget_password', { params: { phone } }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public verifyOTP(phone: string, otp: string): Observable<any> {
    return this.http.put<{ message: string, code: number }>(
      this.customersEndPoint + '/confirm', { params: { phone, confirmation_token: otp } }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public resetPassword(phone: string, password: string, otp: string): Observable<any> {
    return this.http.put<{ message: string }>(
      this.customersEndPoint + '/reset_password',
      {
        params:
        {
          phone,
          password,
          password_confirmation: password,
          confirmation_token: otp
        }
      }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public signup(profile: ISignUpRequestData): Observable<IProfile> {
    return this.http.post<IV4ProfileResponse>(this.customersEndPoint + '/signup', {
      params: profile
    }).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.log(error)
      ),
      map((resp: IV4ProfileResponse) => V4ProfileService.v4ProfileToProfile(resp.data))
    );
  }
}
