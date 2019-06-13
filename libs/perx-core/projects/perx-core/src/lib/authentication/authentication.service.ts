import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from './token-storage.service';
import { CognitoService } from '../whistler/cognito/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements AuthService {

  lastURL: string;
  authing: boolean;
  retries = 0;
  preAuthJWT: string;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private cognitoService: CognitoService,
    private route: ActivatedRoute,
    private router: Router,
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
          this.userAuth(this.preAuthJWT).toPromise().then(
            (res) => {
              // @ts-ignore
              const userBearer = resp.headers.get('Authorization');
              if (userBearer) {
                this.tokenStorage.setAccessToken(userBearer.split(' ')[1]);
              }
            },
            (err) => {
              return of(this.logout());
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
    return this.retries < 3 && response.status === 401;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/preauth');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public async autoLogin() {
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
      this.tokenStorage.setAccessToken(userBearer);

      success = true;
    }
    this.authing = false;
    return success;
  }

  public userAuth(bearer: string) {
    const userId = this.getUrlParameter('pi');
    return this.cognitoService.authenticateUser(bearer, userId);
  }

  public preAuth() {
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
   * Save access data in the storage
   */
  private saveAccessData(accessToken: string) {
    this.tokenStorage.setAccessToken(accessToken);
  }


  private getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(this.getInterruptedUrl());
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
}
