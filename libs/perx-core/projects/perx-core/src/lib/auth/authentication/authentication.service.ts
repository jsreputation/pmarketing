import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { TokenStorage } from './token-storage.service';
import { CognitoService } from '../whistler/cognito/cognito.service';
import { OauthService } from '../v4/oauth/oauth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements AuthService {
  public lastURL: string;
  public authing: boolean;
  public retries: number = 0;
  public maxRetries: number = 2;
  public preAuthJWT: string;
  public didFailAuth: boolean = false;
  public failedAuthObservable: BehaviorSubject<boolean> = new BehaviorSubject(this.didFailAuth);

  constructor(
    private tokenStorage: TokenStorage,
    private cognitoService: CognitoService,
    private v4OauthService: OauthService,
  ) {
  }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage
      .getAppInfoProperty('userAccessToken')
      .pipe(map(token => {
        return !!token;
      }));
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   */
  public refreshToken(): Observable<any> {
    return this.preAuth().pipe(
      tap((resp) => {
        /* check if valid auth  */
        this.retries++;
        if (resp) {
          this.authing = true;
          this.userAuth(this.preAuthJWT).toPromise().then(
            () => {
              // @ts-ignore
              const userBearer = resp.headers.get('Authorization');
              if (userBearer) {
                this.saveUserAccessToken(userBearer.split(' ')[1]);
              }
            },
            () => {
              if (this.retries === this.maxRetries) {
                this.authing = false;
                this.didFailAuth = true;
                this.failedAuthObservable.next(this.didFailAuth);
                this.failedAuthObservable.complete();
                return of(this.logout());
              }

              return of();
            }
          );
        }
      }),
    );
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentially checks status
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return this.retries < this.maxRetries && response.status === 401;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token');
  }

  /**
   * EXTRA AUTH FUNCTIONS
   */

  public async autoLogin(): Promise<boolean> {
    this.authing = true;
    let success = false;

    const userAuthData = await this.userAuth(this.preAuthJWT).toPromise().catch(
      () => {
        console.log('login failed!');
        this.authing = false;
      }
    );
    // @ts-ignore
    const userBearer = userAuthData.body.data[0].attributes.jwt;
    if (userBearer) {
      this.saveUserAccessToken(userBearer);

      success = true;
    }
    this.authing = false;
    return success;
  }

  public userAuth(bearer: string): Observable<any> {
    const userId = (window as any).primaryIdentifier;
    return this.cognitoService.authenticateUserIdWithAppBearer(bearer, userId);
  }

  public async v4GameOauth(user: string, pass: string, mechId?: string, campaignId?: string): Promise<boolean> {
    this.authing = true;
    let success = false;

    const v4AuthData = await this.v4OauthService.authenticateV4Oauth(user, pass, mechId, campaignId)
      .toPromise();
    // .catch(() => {
    //   console.log('login failed!');
    //   this.authing = false;
    // });

    if (v4AuthData === undefined) {
      return false;
    }

    const userBearer = v4AuthData.bearer_token;
    if (userBearer) {
      this.saveUserAccessToken(userBearer);

      success = true;
    }
    this.authing = false;
    return success;
  }

  public async v4AutoLogin(): Promise<boolean> {
    this.authing = true;
    let success = false;

    const userId = (window as any).primaryIdentifier;
    const v4AuthData = await this.v4OauthService.authenticateUserIdWithAppBearer(userId).toPromise().catch(
      () => {
        console.log('login failed!');
        this.authing = false;
      }
    );
    // @ts-ignore
    const userBearer = v4AuthData.bearer_token;
    if (userBearer) {
      this.saveUserAccessToken(userBearer);

      success = true;
    }
    this.authing = false;
    return success;
  }

  public preAuth(): Observable<any> {
    return this.cognitoService.authenticateAppWithPreAuth(location.host).pipe(
      tap((resp) => {
        // @ts-ignore
        this.preAuthJWT = resp.headers.get('Authorization');
        return resp;
      })
    );
  }
  /**
   * This is important, for those public pages, API require app level access token in request header
   * Please add this call in every first page of the app to make sure those public page's API call works
   */
  public v4GetAppAccessToken(): void {
    this.v4OauthService.getAppAccessToken().subscribe(
      (resp) => {
        this.saveAppAccessToken(resp.access_token);
      },
      (err) => {
        console.log(err);
      }
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

  /**
   * This method will send an OTP to the user. This otp should be used as input
   * of method resetPassword.
   */
  // @ts-ignore
  public forgotPassword(phone: string): Observable<void> {
    return this.v4OauthService.forgotPassword(phone);
  }

  // @ts-ignore
  public resetPassword(phone: string, newPwd: string, otp: string): Observable<void> {
    return this.v4OauthService.resetPassword(phone, newPwd, otp);
  }

  // @ts-ignore
  public resendOTP(identifier: string): Observable<void> {
    return throwError('Not implemented yet');
  }

  // @ts-ignore
  public signup(identifier: string, password: string): Observable<void> {
    return throwError('Not implemented yet');
  }

  // @ts-ignore
  public verifyOTP(phone: string, otp: string): Observable<void> {
    return this.v4OauthService.verifyOTP(phone, otp);
  }

  // @ts-ignore
  public changePassword(newPassword: string, oldPassword?: string): Observable<void> {
    return throwError('Not implemented yet');
  }

  /**
   * Get access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */

  public getAccessToken(): Observable<string> {
    const userAccessToken = this.getUserAccessToken();
    const appAccessToken = this.getAccessToken();
    return userAccessToken ? userAccessToken : appAccessToken;
  }

  /**
   * Get user access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */

  public getUserAccessToken(): Observable<string> {
    return this.tokenStorage.getAppInfoProperty('userAccessToken');
  }

  /**
   * Set user access token
   * @description Should set user access token in Observable from e.g.
   * localStorage
   */

  private saveUserAccessToken(accessToken: string): void {
    this.tokenStorage.setAppInfoProperty(accessToken, 'userAccessToken');
  }

  /**
   * Get user access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */

  public getAppAccessToken(): Observable<string> {
    return this.tokenStorage.getAppInfoProperty('appAccessToken');
  }

  /**
   * Set access token
   * @description Should set user access token in Observable from e.g.
   * localStorage
   */

  private saveAppAccessToken(accessToken: string): void {
    debugger
    this.tokenStorage.setAppInfoProperty(accessToken, 'appAccessToken');
  }
}
