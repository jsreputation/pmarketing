import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';
import { IProfile } from '../../../profile/profile.model';
import {
  ISignUpData,
  IResetPasswordData,
  IMessageResponse,
  IAppAccessTokenResponse,
  IChangePasswordData
} from '../../authentication/models/authentication.model';
import { V4ProfileService, IV4ProfileResponse } from '../../../profile/v4-profile.service';

export class EnvConfig {
  // defaults
  public env: any = {
    apiHost: 'https://api.perxtech.io',
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

  constructor(@Optional() config: EnvConfig, private http: HttpClient, private profileService: V4ProfileService) {
    if (!config.env.production) {
      this.appAuthEndPoint = 'http://localhost:4000/v2/oauth';
      this.userAuthEndPoint = 'http://localhost:4000/v4/oauth';
    } else {
      this.appAuthEndPoint = config.env.baseHref + 'v2/oauth';
      this.userAuthEndPoint = config.env.baseHref + 'v4/oauth';
    }
    this.customersEndPoint = config.env.apiHost + '/v4/customers';
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

  public getAppAccessToken(): Observable<IAppAccessTokenResponse> {
    const httpParams = new HttpParams()
      .append('url', location.host);
    return this.http.post<IAppAccessTokenResponse>(this.appAuthEndPoint + '/token', null, {
      params: httpParams
    });
  }

  public forgotPassword(phone: string): Observable<IMessageResponse> {
    return this.http.get<{ message: string }>(
      this.customersEndPoint + '/forget_password', { params: { phone } }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public verifyOTP(phone: string, otp: string): Observable<IMessageResponse> {
    return this.http.put<{ message: string, code: number }>(
      this.customersEndPoint + '/confirm', { params: { phone, confirmation_token: otp } }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public resendOTP(phone: string): Observable<IMessageResponse> {
    return this.http.get<{ message: string }>(
      this.customersEndPoint + '/resend_confirmation', { params: { phone } }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IMessageResponse> {
    return this.http.put<{ message: string }>(
      this.customersEndPoint + '/reset_password',
      {
        params:
        {
          phone: resetPasswordInfo.phone,
          password: resetPasswordInfo.newPassword,
          password_confirmation: resetPasswordInfo.passwordConfirmation,
          confirmation_token: resetPasswordInfo.otp
        }
      }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public signup(profile: ISignUpData): Observable<IProfile> {
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

  public changePassword(changePasswordData: IChangePasswordData): Observable<IMessageResponse> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => {
          return this.http.put<IMessageResponse>(
            `${this.customersEndPoint}/${profile.id}/change_password`,
            {
              params:
              {
                password: changePasswordData.newPassword,
                password_confirmation: changePasswordData.passwordConfirmation,
                confirmation_token: changePasswordData.otp
              }
            });
        }
      )
    );
  }

}
