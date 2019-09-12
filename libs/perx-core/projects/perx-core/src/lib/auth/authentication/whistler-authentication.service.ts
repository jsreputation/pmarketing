import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IProfile } from '../../profile/profile.model';
import { AuthenticationService } from './authentication.service';
import { TokenStorage } from './token-storage.service';
import {
  IAppAccessTokenResponse,
  IMessageResponse,
  IResetPasswordData,
  ISignUpData,
  IChangePasswordData,
  ILoginResponse,
  IChangePhoneData
} from './models/authentication.model';
import { Config } from '../../config/config';
import { ProfileService } from '../../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class WhistlerAuthenticationService extends AuthenticationService implements AuthService {
  private apiHost: string;
  private preAuthEndpoint: string;
  private lastURL: string;
  private retries: number = 0;
  private maxRetries: number = 2;
  public $failedAuthObservable: Observable<boolean>;

  constructor(
    config: Config,
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    profileService: ProfileService
  ) {
    super();
    console.log(profileService);
    this.apiHost = config.apiHost as string;
    if (!config.production) {
      this.preAuthEndpoint = 'http://localhost:4000/cognito/login';
    } else {
      this.preAuthEndpoint = config.baseHref + 'cognito/login';
    }
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

  public refreshToken(): Observable<ILoginResponse> {
    this.retries++;
    return this.getUserWithJWT().pipe(
      tap(
        () => {
          // @ts-ignore
          const userBearer = resp.headers.get('Authorization');
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.saveUserAccessToken(userBearer.split(' ')[1]);
        },
        () => {
          if (this.retries >= this.maxRetries) {
            this.$failedAuthObservable = of(true);
            this.logout();
            return false;
          }
        }
      ),
      catchError(err => throwError(err))
    );
  }

  public autoLogin(): Observable<any> {
    return this.getUserWithJWT().pipe(
      tap(
        (res) => {
          const userBearer = res.data[0].attributes.jwt;
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.saveUserAccessToken('Bearer ' + userBearer);
        },
        () => {
          this.$failedAuthObservable = of(true);
        }
      ),
      catchError(err => throwError(err))
    );
  }

  public getUserWithJWT(): Observable<any> {
    const user = (window as any).primaryIdentifier;
    const httpParams = new HttpParams().append('identifier', user).append('url', location.host);

    return this.http.post<any>(this.preAuthEndpoint, null, {
      params: httpParams
    });
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return this.retries < this.maxRetries && response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token') || url.endsWith('/v2/cognito/login');
  }

  // @ts-ignore
  public login(user: string, pass: string, mechId?: string, campaignId?: string): Observable<any> {
    return this.getIamUser(user, pass, mechId).pipe(
      tap(res => {
        const userBearer = res.headers.get('Authorization');
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

  public getIamUser(user: string, pass: string, mechId?: string): Observable<any> {
    return this.http.post<any>(this.apiHost + '/iam/users/sign_in', {
      data: {
        attributes: {
          tenant_id: mechId,
          username: user,
          password: pass
        }
      }
    }, { observe: 'response' });
  }

  public getAppToken(): Observable<IAppAccessTokenResponse> {
    return throwError('Not implement yet');
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
    return throwError('Not implement yet');
  }

  // @ts-ignore
  public resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IMessageResponse> {
    return throwError('Not implement yet');
  }

  // @ts-ignore
  public resendOTP(phone: string): Observable<IMessageResponse> {
    return throwError('Not implement yet');
  }

  // @ts-ignore
  public signup(profile: ISignUpData): Observable<IProfile> {
    return throwError('Not implement yet');
  }

  public requestVerificationToken(): Observable<void> {
    return throwError('Not implement yet');
  }

  // @ts-ignore
  public changePhone(changePhoneData: IChangePhoneData): Observable<void> {
    return throwError('Not implement yet');
  }

  // @ts-ignore
  public verifyOTP(phone: string, otp: string): Observable<IMessageResponse> {
    return throwError('Not implement yet');
  }

  // @ts-ignore
  public changePassword(changePasswordData: IChangePasswordData): Observable<IMessageResponse> {
    return throwError('Not implement yet');
  }

  public getAccessToken(): Observable<string> {
    const userAccessToken = this.getUserAccessToken();
    const appAccessToken = this.getAppAccessToken();
    return of(userAccessToken ? userAccessToken : appAccessToken);
  }

  public getUserAccessToken(): string {
    return this.tokenStorage.getAppInfoProperty('userAccessToken');
  }

  public saveUserAccessToken(accessToken: string): void {
    this.tokenStorage.setAppInfoProperty(accessToken, 'userAccessToken');
  }

  public getAppAccessToken(): string {
    return this.tokenStorage.getAppInfoProperty('appAccessToken');
  }

  public saveAppAccessToken(accessToken: string): void {
    this.tokenStorage.setAppInfoProperty(accessToken, 'appAccessToken');
  }
}
