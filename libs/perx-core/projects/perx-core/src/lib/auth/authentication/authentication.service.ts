import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
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
      .getAccessToken()
      .pipe(map(token => {
        return !!token;
      }));
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   */
  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccessToken();
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
                this.saveAccessData(userBearer.split(' ')[1]);
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
    return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token');
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
      this.saveAccessData(userBearer);

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
      this.saveAccessData(userBearer);

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
      this.saveAccessData(userBearer);

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

  public setInterruptedUrl(url: string): void {
    this.lastURL = url;
  }

  public getInterruptedUrl(): string {
    return this.lastURL;
  }

  public logout(): void {
    this.tokenStorage.clear();
  }

  /**
   * This method will send an OTP to the user. This otp should be used as input
   * of method resetPassword.
   */
  // @ts-ignore
  public forgotPassword(identifier: string): Observable<void> {
    return throwError('Not implemented yet');
  }

  // @ts-ignore
  public resetPassword(otp: string, password: string): Observable<void> {
    return throwError('Not implemented yet');
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
  public verifyOTP(identifier: string, otp: string): Observable<void> {
    return throwError('Not implemented yet');
  }

  // @ts-ignore
  public changePassword(newPassword: string, oldPassword?: string): Observable<void> {
    return throwError('Not implemented yet');
  }

  /**
   * PRIVATE HELPER FUNCTIONS
   */

  private saveAccessData(accessToken: string): void {
    this.tokenStorage.setAccessToken(accessToken);
  }

  // private getUrlParameter(name) {
  //   const url = this.getInterruptedUrl() !== undefined ? this.getInterruptedUrl() : window.location.toString();
  //   name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  //   const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  //   const results = regex.exec(url);
  //   return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  // }
}
