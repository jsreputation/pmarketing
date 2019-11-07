import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import { of, Observable, throwError, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProfile } from '../../profile/profile.model';
import { AuthenticationService } from './authentication.service';
import { TokenStorage } from './token-storage.service';
import { IProfileAttributes } from '../../profile/profile.model';
import {
  IAppAccessTokenResponse,
  IMessageResponse,
  IResetPasswordData,
  ISignUpData,
  IChangePasswordData,
  IChangePhoneData
} from './models/authentication.model';
import { Config } from '../../config/config';
import { IJsonApiListPayload } from '../../jsonapi.payload';
import { IWhistlerProfileAttributes } from '@perx/whistler';

interface ICognitoLogin {
  jwt: string;
}

interface IUserJWTRequest {
  identifier: string;
  url: string;
  profile?: IWhistlerProfileAttributes;
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerAuthenticationService extends AuthenticationService implements AuthService {
  private apiHost: string;
  private preAuthEndpoint: string;
  private createUsersEndPoint: string;
  private lastURL: string;
  private retries: number = 0;
  private maxRetries: number = 2;
  private $failedAuthObservableSubject: Subject<boolean>;

  constructor(
    config: Config,
    private http: HttpClient,
    private tokenStorage: TokenStorage,
  ) {
    super();
    this.apiHost = config.apiHost as string;
    if (!config.production) {
      this.preAuthEndpoint = 'http://localhost:4000/cognito/login';
      this.createUsersEndPoint = 'http://localhost:4000/cognito/users';
    } else {
      this.preAuthEndpoint = config.baseHref + 'cognito/login';
      this.createUsersEndPoint = config.baseHref + 'cognito/users';
    }
    this.$failedAuthObservableSubject = new Subject();
  }

  public get $failedAuth(): Observable<boolean> {
    return this.$failedAuthObservableSubject;
  }

  public isAuthorized(): Observable<boolean> {
    const token = this.tokenStorage
      .getAppInfoProperty('userAccessToken');

    return of(!!token);
  }

  public refreshToken(): Observable<any> {
    /**
     * Conditions
     * login success, but Token expired, when API return 401, this function will be trigged.
     *  1 IAM user need to redirect to login page
     *  2 Cognito user we store PI at localStorage when user auto login, then help user to auto login.
     *
     * TODO: Andrew, failedAuthObservableSubject is not working, affect refresh page when token is not valid
     */

    let isRefreshTokenComplete = true;
    this.retries++;
    if (this.retries <= this.maxRetries && this.getPI()) {
      this.autoLogin().subscribe(
        () => console.log('finished refresh token')
      );
    } else {
      isRefreshTokenComplete = false;
      this.logout();
    }
    this.$failedAuthObservableSubject.next(!isRefreshTokenComplete);
    return of(isRefreshTokenComplete);
  }

  public autoLogin(): Observable<any> {
    return this.getUserWithPI().pipe(
      tap(
        (res: IJsonApiListPayload<ICognitoLogin>) => {
          const userBearer = res.data[0].attributes.jwt;
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.saveUserAccessToken(userBearer);
          console.log(res);
        }
      )
    );
  }

  public createUserAndAutoLogin(pi: string, userObj?: IProfileAttributes): Observable<any> {
    return this.createUserWithPI(pi, userObj).pipe(
      tap(
        (res: IJsonApiListPayload<ICognitoLogin>) => {
          const userBearer = res.data[0].attributes.jwt;
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.savePI(pi);
          this.saveUserAccessToken(userBearer);
        }
      )
    );
  }

  private getUserWithPI(): Observable<IJsonApiListPayload<ICognitoLogin>> {
    const user = (window as any).primaryIdentifier || this.getPI();
    const userJWTRequest: IUserJWTRequest = {
      url: location.host,
      identifier: user
    };

    return this.http.post<IJsonApiListPayload<ICognitoLogin>>(this.preAuthEndpoint, userJWTRequest);
  }

  private createUserWithPI(pi: string, userObj?: IWhistlerProfileAttributes): Observable<IJsonApiListPayload<ICognitoLogin>> {
    const userJWTRequest: IUserJWTRequest = {
      url: location.host,
      identifier: pi
    };
    if (userObj) {
      userJWTRequest.profile = userObj;
    }

    return this.http.post<IJsonApiListPayload<ICognitoLogin>>(this.createUsersEndPoint, userJWTRequest);
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
      tap(
        res => {
          const userBearer = res.headers.get('Authorization');
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.saveUserAccessToken(userBearer);
        },
        () => this.$failedAuthObservableSubject.next(true)
      )
    );
  }

  private getIamUser(user: string, pass: string, mechId?: string): Observable<any> {
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
    this.tokenStorage.clearAppInfoProperty(['userAccessToken', 'pi']);
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
  public requestVerificationToken(phone?: string): Observable<void> {
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

  public getPI(): string {
    return this.tokenStorage.getAppInfoProperty('pi');
  }

  public savePI(pi: string): void {
    this.tokenStorage.setAppInfoProperty(pi, 'pi');
  }

  public mergeUserById(fromIds: string[], toId: string): Observable<void> {
    return this.http.post<any>(this.apiHost + '/chown_requests', {
      data: {
        attributes: {
          from_ids: fromIds,
          to_id: toId
        }
      }
    });
  }
}
