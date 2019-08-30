import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { tap, mergeMap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IProfile } from '../../profile/profile.model';
import { AuthenticationService } from './authentication.service';
import { EnvConfig } from '../../shared/env-config';
import { TokenStorage } from './token-storage.service';
import {
  IAppAccessTokenResponse,
  IMessageResponse,
  IResetPasswordData,
  ISignUpData,
  IChangePasswordData,
  ILoginResponse
} from './models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class WhistlerAuthenticationService extends AuthenticationService implements AuthService {
  private apiHost: string;
  private preAuthEndpoint: string;
  private lastURL: string;
  private retries: number = 0;
  private maxRetries: number = 2;
  private preAuthJWT: string;
  public $failedAuthObservable: Observable<boolean>;

  constructor(
    config: EnvConfig,
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) {
    super();
    this.apiHost = config.env.apiHost as string;
    if (!config.env.production) {
      this.preAuthEndpoint = 'http://localhost:4000/preauth';
    } else {
      this.preAuthEndpoint = config.env.baseHref + 'preauth';
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

  // Need to review whistler auth process
  public setPreAuthJWT(): Observable<any> {
    return this.http.get(this.preAuthEndpoint, {
      params: {
        url: location.host
      },
      observe: 'response'
    }).pipe(
      tap((resp) => {
        this.preAuthJWT = resp.headers.get('Authorization');
        return resp;
      })
    );
  }

  public refreshToken(): Observable<ILoginResponse> {
    this.retries++;
    return this.setPreAuthJWT().pipe(
      mergeMap(
        () => {
          /* check if valid auth  */
          return this.getUserWithJWT(this.preAuthJWT).pipe(
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
      )
    );
  }

  public autoLogin(): Observable<ILoginResponse> {
    return this.setPreAuthJWT().pipe(
      mergeMap(
        () => {
          return this.getUserWithJWT(this.preAuthJWT).pipe(
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
      )
    );

  }

  // Don't know real return format yet, put `ILoginResponse` now, later will refactor map transform
  public getUserWithJWT(bearer: string): Observable<ILoginResponse> {
    const user = (window as any).primaryIdentifier;
    const payload = {
      data: {
        type: 'login',
        attributes: {
          primary_identifier: user,
        }
      }
    };
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/vnd.api+json',
          Authorization: bearer
        })
    };
    return this.http.post<ILoginResponse>(this.apiHost + '/cognito/login', payload, {
      headers: httpOptions.headers,
      observe: 'response'
    }).pipe(
      map(
        (res: any) => {
          return {
            bearer_token: res.body.data[0].attributes.jwt || undefined
          };
        }
      )
    );
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return this.retries < this.maxRetries && response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token');
  }

  // @ts-ignore
  public login(user: string, pass: string, mechId?: string, campaignId?: string): Observable<void> {
    return throwError('Not implement yet');
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
