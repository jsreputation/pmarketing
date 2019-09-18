import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import { tap, mergeMap, catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from './token-storage.service';
import { AuthenticationService } from './authentication.service';
import { IProfile } from '../../profile/profile.model';
import {
  ISignUpData,
  IResetPasswordData,
  IMessageResponse,
  IAppAccessTokenResponse,
  IChangePasswordData,
  ILoginResponse,
  IChangePhoneData
} from '../authentication/models/authentication.model';
import { ProfileService } from '../../profile/profile.service';
import { Config } from '../../config/config';
import { IV4ProfileResponse, V4ProfileService } from '../../profile/v4-profile.service';

interface IV4SignUpData {
  first_name?: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  email?: string;
  birthday?: string;
  gender?: string;
  password: string;
  password_confirmation: string;
}

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
  public $failedAuthObservable: Observable<boolean>;

  constructor(
    config: Config,
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private profileService: ProfileService
  ) {
    super();
    if (!config.production) {
      this.appAuthEndPoint = 'http://localhost:4000/v2/oauth';
      this.userAuthEndPoint = 'http://localhost:4000/v4/oauth';
    } else {
      this.appAuthEndPoint = config.baseHref + 'v2/oauth';
      this.userAuthEndPoint = config.baseHref + 'v4/oauth';
    }
    this.customersEndPoint = config.apiHost + '/v4/customers';
    this.$failedAuthObservable = new Observable();
  }

  public get $failedAuth(): Observable<boolean> {
    return this.$failedAuthObservable;
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

  public login(user: string, pass: string, mechId?: string, campaignId?: string): Observable<any> {
    return this.authenticateUser(user, pass, mechId, campaignId).pipe(
      tap(
        (res: ILoginResponse) => {
          const userBearer = res && res.bearer_token;
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.saveUserAccessToken(userBearer);
        },
        () => {
          this.$failedAuthObservable = of(true);
        }
      ),
      catchError(err => throwError(err))
    );
  }

  public authenticateUser(user: string, pass: string, mechId?: string, campaignId?: string): Observable<ILoginResponse> {
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

    return this.http.post<ILoginResponse>(this.userAuthEndPoint + '/token', null, {
      params: httpParams
    });
  }

  public autoLogin(): Observable<any> {
    const user = (window as any).primaryIdentifier;
    return this.authenticateUserWithPI(user).pipe(
      tap(
        (res: ILoginResponse) => {
          const userBearer = res && res.bearer_token;
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.saveUserAccessToken(userBearer);
        },
        () => {
          this.$failedAuthObservable = of(true);
        }
      ),
      catchError(err => throwError(err))
    );
  }

  public authenticateUserWithPI(user: string): Observable<ILoginResponse> {
    const httpParams = new HttpParams()
      .append('url', location.host)
      .append('identifier', user);

    return this.http.post<ILoginResponse>(this.userAuthEndPoint + '/token', null, {
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
    return this.http.get<IMessageResponse>(
      this.customersEndPoint + '/resend_confirmation', { params: { phone } }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  private signUpDataToV4SignUpData(data: ISignUpData): IV4SignUpData {
    const res = {
      last_name: data.lastName,
      first_name: data.firstName,
      birthday: data.birthDay,
      ...data
    };
    res.lastName = undefined;
    res.firstName = undefined;
    return res;
  }

  // @ts-ignore
  public signup(profile: ISignUpData): Observable<IProfile> {
    const profileV4 = this.signUpDataToV4SignUpData(profile);
    return this.http.post<IV4ProfileResponse>(this.customersEndPoint + '/signup', profileV4)
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        ),
        map((resp: IV4ProfileResponse) => V4ProfileService.v4ProfileToProfile(resp.data))
      );
  }

  // @ts-ignore
  public verifyOTP(phone: string, otp: string): Observable<IMessageResponse> {
    return this.http.patch<IMessageResponse>(
      this.customersEndPoint + '/confirm', { phone, confirmation_token: otp }).pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public requestVerificationToken(phone?: string): Observable<void> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) =>
          this.http.get<void>(
            `${this.customersEndPoint}/${profile.id}/request_verification_token${phone ? '?phone=' + phone : ''}`
          )
      )
    );
  }

  public changePhone(changePhoneData: IChangePhoneData): Observable<void> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => {
          return this.http.patch<void>(
            `${this.customersEndPoint}/${profile.id}/change_phone`,
            {
              phone: changePhoneData.phone,
              confirmation_token: changePhoneData.otp
            }
          );
        }
      )
    );
  }

  public changePassword(changePasswordData: IChangePasswordData): Observable<IMessageResponse> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => {
          return this.http.patch<IMessageResponse>(
            `${this.customersEndPoint}/${profile.id}/change_password`,
            {
              old_password: changePasswordData.oldPassword,
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
