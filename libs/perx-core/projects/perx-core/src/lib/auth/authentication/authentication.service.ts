import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { TokenStorage } from './token-storage.service';
import { CognitoService } from '../whistler/cognito/cognito.service';
import { OauthService } from '../v4/oauth/oauth.service';

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
    throw new Error('Method not implemented.');
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentially checks status
   */
  public refreshShouldHappen(): boolean {
    throw new Error('Method not implemented.');
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * Essentially checks status
   */
  public verifyTokenRequest(): boolean {
    throw new Error('Method not implemented.');
  }

  /**
   * Add token to headers, dependent on server
   * set-up, by default adds a bearer token.
   * Called by interceptor.
   *
   * To change behavior, override this method.
   */
  public getHeaders?(): { [name: string]: string | string[]; } {
    throw new Error('Method not implemented.');
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
  public v4GetAppAccessToken(): Observable<any> {
    return this.v4OauthService.getAppAccessToken().pipe(
      tap((resp) => {
        this.saveAppAccessToken(resp.access_token);
        return resp;
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
  public signUp(identifier: string, password: string): Observable<void> {
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
    this.tokenStorage.setAppInfoProperty(accessToken, 'appAccessToken');
  }
}
