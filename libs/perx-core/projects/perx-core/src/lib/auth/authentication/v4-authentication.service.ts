import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import { tap, mergeMap, catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { IProfile } from '../../profile/profile.model';
import {
  ISignUpData,
  IResetPasswordData,
  IChangePasswordData,
  IChangePhoneData
} from '../authentication/models/authentication.model';
import { IWMessageResponse, IWAppAccessTokenResponse, IWLoginResponse } from '@perx/whistler';
import { ProfileService } from '../../profile/profile.service';
import { Config } from '../../config/config';
import { IV4ProfileResponse, V4ProfileService } from '../../profile/v4-profile.service';
import { TokenStorage } from '../../utils/storage/token-storage.service';

interface IV4SignUpData {
  first_name?: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  email?: string;
  birthday?: string;
  gender?: string;
  password: string;
  password_confirmation?: string;
  personal_properties?: { [key: string]: string | undefined };
}

interface IV4AuthenticateUserRequest {
  url: string;
  username: string;
  password: string;
  mech_id?: string;
  campaign_id?: string;
  scope?: string;
}

interface IV4AuthenticatePiRequest {
  url: string;
  identifier: string;
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

  public login(user: string, pass: string, mechId?: string, campaignId?: string, scope?: string): Observable<any> {
    return this.authenticateUser(user, pass, mechId, campaignId, scope).pipe(
      tap(
        (res: IWLoginResponse) => {
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

  public authenticateUser(user: string, pass: string, mechId?: string, campaignId?: string, scope?: string): Observable<IWLoginResponse> {
    const authenticateBody: IV4AuthenticateUserRequest = {
      url: location.host,
      username: user,
      password: pass,
      ...mechId && { mech_id: mechId },
      ...campaignId && { campaign_id: campaignId },
      ...scope && { scope }
    };
    return this.http.post<IWLoginResponse>(this.userAuthEndPoint + '/token', authenticateBody);
  }

  public autoLogin(): Observable<any> {
    const user = (window as any).primaryIdentifier;
    return this.authenticateUserWithPI(user).pipe(
      tap(
        (res: IWLoginResponse) => {
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

  // @ts-ignore
  public createUserAndAutoLogin(pi: string, userObj?: { [key: string]: any }, anonymous?: boolean): Observable<any> {
    return throwError('Not implement yet');
  }

  public authenticateUserWithPI(user: string): Observable<IWLoginResponse> {
    const authenticatePiRequest: IV4AuthenticatePiRequest = {
      url: location.host,
      identifier: user
    };

    return this.http.post<IWLoginResponse>(this.userAuthEndPoint + '/token', authenticatePiRequest);
  }

  public getAppToken(): Observable<IWAppAccessTokenResponse> {
    const authenticateRequest: { url: string } = {
      url: location.host
    };

    return this.http.post<IWAppAccessTokenResponse>(this.appAuthEndPoint + '/token', authenticateRequest).pipe(
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
    this.tokenStorage.clearAppInfoProperty(['userAccessToken', 'pi', 'anonymous']);
  }

  // @ts-ignore
  public forgotPassword(phone: string): Observable<IWMessageResponse> {
    return this.http.get<IWMessageResponse>(`${this.customersEndPoint}/forget_password`, { params: { phone } })
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IWMessageResponse> {
    return this.http.patch<IWMessageResponse>(
      `${this.customersEndPoint}/reset_password`,
      {
        phone: resetPasswordInfo.phone,
        password: resetPasswordInfo.newPassword,
        password_confirmation: resetPasswordInfo.passwordConfirmation,
        confirmation_token: resetPasswordInfo.otp
      }
    ).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.log(error)
      )
    );
  }

  // @ts-ignore
  public resendOTP(phone: string): Observable<IWMessageResponse> {
    return this.http.get<IWMessageResponse>(`${this.customersEndPoint}/resend_confirmation`, { params: { phone } })
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  private signUpDataToV4SignUpData(data: ISignUpData): IV4SignUpData {
    return {
      last_name: data.lastName || '',
      first_name: data.firstName,
      birthday: data.birthDay,
      password_confirmation: data.passwordConfirmation,
      personal_properties: {
        title: data.title,
        postcode: data.postcode
      },
      ...data
    };
  }

  // @ts-ignore
  public signup(profile: ISignUpData): Observable<IProfile> {
    const profileV4 = this.signUpDataToV4SignUpData(profile);
    return this.http.post<IV4ProfileResponse>(`${this.customersEndPoint}/signup`, profileV4)
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        ),
        map((resp: IV4ProfileResponse) => V4ProfileService.v4ProfileToProfile(resp.data))
      );
  }

  // @ts-ignore
  public verifyOTP(phone: string, otp: string): Observable<IWMessageResponse> {
    return this.http.patch<IWMessageResponse>(`${this.customersEndPoint}/confirm`, { phone, confirmation_token: otp })
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

  public requestVerificationToken(phone?: string): Observable<void> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => this.http.get<void>(
          `${this.customersEndPoint}/${profile.id}/request_verification_token${phone ? '?phone=' + phone : ''}`
        )
      )
    );
  }

  public changePhone(changePhoneData: IChangePhoneData): Observable<void> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => this.http.patch<void>(
          `${this.customersEndPoint}/${profile.id}/change_phone`,
          {
            phone: changePhoneData.phone,
            confirmation_token: changePhoneData.otp
          }
        )
      )
    );
  }

  public changePassword(changePasswordData: IChangePasswordData): Observable<IWMessageResponse> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => this.http.patch<IWMessageResponse>(
          `${this.customersEndPoint}/${profile.id}/change_password`,
          {
            old_password: changePasswordData.oldPassword,
            password: changePasswordData.newPassword,
            password_confirmation: changePasswordData.passwordConfirmation,
            confirmation_token: changePasswordData.otp
          }
        )
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
    return this.tokenStorage.getAppInfoProperty('userAccessToken') || '';
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
    return this.tokenStorage.getAppInfoProperty('appAccessToken') || '';
  }

  /**
   * Set access token
   * @description Should set user access token in Observable from e.g.
   * localStorage
   */
  public saveAppAccessToken(accessToken: string): void {
    this.tokenStorage.setAppInfoProperty(accessToken, 'appAccessToken');
  }

  public getPI(): string {
    return this.tokenStorage.getAppInfoProperty('pi') || '';
  }

  public savePI(pi: string): void {
    this.tokenStorage.setAppInfoProperty(pi, 'pi');
  }

  public getAnonymous(): boolean {
    return !!this.tokenStorage.getAppInfoProperty('anonymous');
  }

  public saveAnonymous(anonymous: boolean): void {
    this.tokenStorage.setAppInfoProperty(anonymous, 'anonymous');
  }

  public getUserId(): number | null {
    const id: string | undefined = this.tokenStorage.getAppInfoProperty('id');
    return id ? Number.parseInt(id, 10) : null;
  }

  public saveUserId(id: number): void {
    this.tokenStorage.setAppInfoProperty(id, 'id');
  }

  // @ts-ignore
  public mergeUserById(fromIds: number[], toId: number): Observable<void> {
    return throwError('Not implement yet');
  }
}
