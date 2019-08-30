import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { tap, mergeMap, catchError } from 'rxjs/operators';
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
  IChangePasswordData
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

  public refreshToken(): Observable<any> {
    let success = false;
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
                if (userBearer) {
                  this.saveUserAccessToken(userBearer.split(' ')[1]);
                  success = true;
                }
                return success;
              },
              () => {
                if (this.retries >= this.maxRetries) {
                  this.logout();
                  return false;
                }
              }
            )
          );
        }
      )
    );
  }

  public autoLogin(): Observable<void> {
    return this.setPreAuthJWT().pipe(
      mergeMap(
        () => {
          return this.getUserWithJWT(this.preAuthJWT).pipe(
            tap(
              (res) => {
                const userBearer = res.body.data[0].attributes.jwt || undefined;
                if (!userBearer) {
                  throw new Error('Get authentication token failed!');
                }
                this.saveUserAccessToken(userBearer);
              }
            ),
            catchError(err => throwError(err))
          );
        }
      )
    );

  }

  // Don't know real return format yet, put `any` now 
  public getUserWithJWT(bearer: string): Observable<any> {
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
    return this.http.post(this.apiHost + '/cognito/login', payload, {
      headers: httpOptions.headers,
      observe: 'response'
    });
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
