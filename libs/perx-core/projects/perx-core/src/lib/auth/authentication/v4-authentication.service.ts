import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import { tap, mergeMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from './token-storage.service';
import { AuthenticationService } from './authentication.service';
import { EnvConfig } from '../../shared/env-config';
import { IProfile } from '../../profile/profile.model';
import {
  ISignUpData,
  IResetPasswordData,
  IMessageResponse,
  IAppAccessTokenResponse,
  IChangePasswordData
} from '../authentication/models/authentication.model';
import { V4ProfileService } from '../../profile/v4-profile.service';

// interface IV4SignUpData {
//   first_name?: string;
//   last_name: string;
//   middle_name?: string;
//   phone: string;
//   email?: string;
//   birthday?: string;
//   gender?: string;
//   password: string;
//   password_confirmation: string;
// }

@Injectable({
  providedIn: 'root'
})
export class V4AuthenticationService extends AuthenticationService implements AuthService {
  private appAuthEndPoint: string;
  private userAuthEndPoint: string;
  private customersEndPoint: string;
  private lastURL: string;
  private retries: number = 0;
  private maxRetries: number = 2;

  constructor(
    config: EnvConfig,
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private profileService: V4ProfileService
  ) {
    super();
    if (!config.env.production) {
      this.appAuthEndPoint = 'http://localhost:4000/v2/oauth';
      this.userAuthEndPoint = 'http://localhost:4000/v4/oauth';
    } else {
      this.appAuthEndPoint = config.env.baseHref + 'v2/oauth';
      this.userAuthEndPoint = config.env.baseHref + 'v4/oauth';
    }
    this.customersEndPoint = config.env.apiHost + '/v4/customers';
  }

  public isAuthorized(): Observable<boolean> {
    const token = this.tokenStorage
      .getAppInfoProperty('userAccessToken');

    return of(!!token);
  }

  // To be refactor, current not in use
  public refreshToken(): Observable<any> {
    console.log('No refresh token function required for v*, always pass true to ngx-auth');
    return of(true);
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return this.retries < this.maxRetries && response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token');
  }

  public login(user: string, pass: string, mechId?: string, campaignId?: string): Observable<boolean> {
    let success = false;
    return this.authenticateUser(user, pass, mechId, campaignId).pipe(
      tap(
        (res) => {
          const userBearer = res && res.bearer_token;
          if (userBearer) {
            this.saveUserAccessToken(userBearer);
            success = true;
          }
          return success;
        }
      )
    );
  }

  public authenticateUser(user: string, pass: string, mechId?: string, campaignId?: string): Observable<any> {
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

  public autoLogin(): Observable<boolean> {
    let success = false;
    const user = (window as any).primaryIdentifier;
    return this.authenticateUserWithPI(user).pipe(
      tap(
        (res) => {
          const userBearer = res && res.bearer_token;
          if (userBearer) {
            this.saveUserAccessToken(userBearer);
            success = true;
          }
          return success;
        }
      )
    );
  }

  public authenticateUserWithPI(user: string): Observable<any> {
    const httpParams = new HttpParams()
      .append('url', location.host)
      .append('identifier', user);

    return this.http.post(this.userAuthEndPoint + '/token', null, {
      params: httpParams
    });
  }

  public getAppToken(): Observable<IAppAccessTokenResponse> {
    const httpParams = new HttpParams()
      .append('url', location.host);

    return this.http.post<IAppAccessTokenResponse>(this.appAuthEndPoint + '/token', null, {
      params: httpParams
    }).pipe(
      tap((resp) => {
        this.saveAppAccessToken(resp.access_token);
      })
    );
  }

  public setInterruptedUrl(url: string): void {
    this.lastURL = url;
  }

  public getInterruptedUrl(): string {
    return this.lastURL;
  }

  public logout(): void {
    this.tokenStorage.clearAppInfoProperty('userAccessToken');
  }

  // @ts-ignore
  public forgotPassword(phone: string): Observable<IMessageResponse> {
    return this.http.get<IMessageResponse>(
      this.customersEndPoint + '/forget_password', { params: { phone } }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IMessageResponse> {
    return this.http.patch<IMessageResponse>(
      this.customersEndPoint + '/reset_password',
      {
        phone: resetPasswordInfo.phone,
        password: resetPasswordInfo.newPassword,
        password_confirmation: resetPasswordInfo.passwordConfirmation,
        confirmation_token: resetPasswordInfo.otp
      }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  // @ts-ignore
  public resendOTP(phone: string): Observable<IMessageResponse> {
    return throwError('Temporarily disabled');
    // return this.http.get<IMessageResponse>(
    //   this.customersEndPoint + '/resend_confirmation', { params: { phone } }).pipe(
    //     tap( // Log the result or error
    //       data => console.log(data),
    //       error => console.log(error)
    //     )
    //   );
  }
  // used for signup function, don't remove
  // private static signUpDataToV4SignUpData(data: ISignUpData): IV4SignUpData {
  //   const res = {
  //     last_name: data.lastName,
  //     first_name: data.firstName,
  //     birthday: data.birthDay,
  //     ...data
  //   };
  //   res.lastName = undefined;
  //   res.firstName = undefined;
  //   return res;
  // }

  // @ts-ignore
  public signup(profile: ISignUpData): Observable<IProfile> {
    return throwError('Temporarily disabled');
    // const profileV4 = V4AuthenticationService.signUpDataToV4SignUpData(profile);
    // return this.http.post<IV4ProfileResponse>(this.customersEndPoint + '/signup', profileV4)
    //   .pipe(
    //     tap( // Log the result or error
    //       data => console.log(data),
    //       error => console.log(error)
    //     ),
    //     map((resp: IV4ProfileResponse) => V4ProfileService.v4ProfileToProfile(resp.data))
    //   );
  }

  // @ts-ignore
  public verifyOTP(phone: string, otp: string): Observable<IMessageResponse> {
    return throwError('Temporarily disabled');
    // return this.http.patch<IMessageResponse>(
    //   this.customersEndPoint + '/confirm', { phone, confirmation_token: otp }).pipe(
    //     tap( // Log the result or error
    //       data => console.log(data),
    //       error => console.log(error)
    //     )
    //   );
  }

  public changePassword(changePasswordData: IChangePasswordData): Observable<IMessageResponse> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => {
          return this.http.patch<IMessageResponse>(
            `${this.customersEndPoint}/${profile.id}/change_password`,
            {
              password: changePasswordData.newPassword,
              password_confirmation: changePasswordData.passwordConfirmation,
              confirmation_token: changePasswordData.otp
            });
        }
      )
    );
  }

  /**
   * Get access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */
  public getAccessToken(): Observable<string> {
    const userAccessToken = this.getUserAccessToken();
    const appAccessToken = this.getAppAccessToken();
    return of(userAccessToken ? userAccessToken : appAccessToken);
  }

  /**
   * Get user access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */
  public getUserAccessToken(): string {
    return this.tokenStorage.getAppInfoProperty('userAccessToken');
  }

  /**
   * Set user access token
   * @description Should set user access token in Observable from e.g.
   * localStorage
   */
  public saveUserAccessToken(accessToken: string): void {
    this.tokenStorage.setAppInfoProperty(accessToken, 'userAccessToken');
  }

  /**
   * Get user access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */
  public getAppAccessToken(): string {
    return this.tokenStorage.getAppInfoProperty('appAccessToken');
  }

  /**
   * Set access token
   * @description Should set user access token in Observable from e.g.
   * localStorage
   */
  public saveAppAccessToken(accessToken: string): void {
    this.tokenStorage.setAppInfoProperty(accessToken, 'appAccessToken');
  }

}
