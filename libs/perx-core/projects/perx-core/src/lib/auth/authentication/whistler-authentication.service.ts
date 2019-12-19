import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import { of, Observable, throwError, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProfile } from '../../profile/profile.model';
import { AuthenticationService } from './authentication.service';
import {
  IResetPasswordData,
  ISignUpData,
  IChangePasswordData,
  IChangePhoneData
} from './models/authentication.model';
import { Config } from '../../config/config';
import {
  IWAppAccessTokenResponse,
  IWCognitoLogin,
  IJsonApiListPayload,
  IWProfileAttributes,
} from '@perx/whistler';
import { TokenStorage } from '../../utils/storage/token-storage.service';
import { IMessageResponse } from './authentication.service';

interface IUserJWTRequest {
  identifier: string;
  url: string;
  anonymous?: boolean;
  profile?: { [key: string]: any };
}

enum APIAttributesMap {
  fistName = 'first_name',
  first_name = 'first_name',
  lastName = 'last_name',
  last_name = 'last_name',
  primary_identifier = 'primary_identifier',
  primaryIdentifier = 'primary_identifier',
  phone_number = 'phone_number',
  phoneNumber = 'phone_number',
  email_address = 'email_address',
  emailAddress = 'email_address',
  title = 'title'
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerAuthenticationService extends AuthenticationService implements AuthService {
  private apiHost: string;
  private preAuthEndpoint: string;
  private deleteTokenCacheEndPoint: string;
  private createUsersEndPoint: string;
  private lastURL: string;
  private retries: number = 0;
  private maxRetries: number = 2;
  private $failedAuthObservableSubject: Subject<boolean>;

  constructor(
    config: Config,
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) {
    super();
    this.apiHost = config.apiHost as string;
    if (!config.production) {
      this.preAuthEndpoint = 'http://localhost:4000/cognito/login';
      this.createUsersEndPoint = 'http://localhost:4000/cognito/users';
      this.deleteTokenCacheEndPoint = 'http://localhost:4000/delete_cache';
    } else {
      this.preAuthEndpoint = config.baseHref + 'cognito/login';
      this.createUsersEndPoint = config.baseHref + 'cognito/users';
      this.deleteTokenCacheEndPoint = config.baseHref + 'delete_cache';
    }
    this.$failedAuthObservableSubject = new Subject();
  }

  public get $failedAuth(): Observable<boolean> {
    return this.$failedAuthObservableSubject;
  }

  private static UsertoWUser(userObj: { [key: string]: any }, PI: string): IWProfileAttributes {
    const profile: IWProfileAttributes = {
      title: null,
      first_name: null,
      last_name: null,
      phone_number: null,
      email_address: null,
      primary_identifier: PI,
      properties: {}
    };

    Object.entries(userObj).forEach(field => {
      if (APIAttributesMap[field[0]] !== undefined) {
        profile[APIAttributesMap[field[0]]] = field[1];
      } else {
        if (!profile.properties) {
          profile.properties = {};
        }
        profile.properties[field[0]] = field[1];
      }
    });
    return profile;
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

  public autoLogin(): Observable<void> {
    return this.getUserWithPI().pipe(
      tap(
        (res: IJsonApiListPayload<IWCognitoLogin>) => {
          const userBearer = res.data[0].attributes.jwt;
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          const pi = (window as any).primaryIdentifier || this.getPI();
          this.savePI(pi);
          this.saveUserId(Number.parseInt(res.data[0].id, 10));
          this.saveUserAccessToken(userBearer);
        }
      ),
      map(() => void 0)
    );
  }

  private getUserWithPI(): Observable<IJsonApiListPayload<IWCognitoLogin>> {
    const user: string = (window as any).primaryIdentifier || this.getPI();
    const userJWTRequest: IUserJWTRequest = {
      url: location.host,
      identifier: user
    };

    return this.http.post<IJsonApiListPayload<IWCognitoLogin>>(this.preAuthEndpoint, userJWTRequest);
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return this.retries < this.maxRetries && response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token') || url.endsWith('/cognito/login');
  }

  // @ts-ignore
  public login(user: string, pass: string, mechId?: string, campaignId?: string): Observable<void> {
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

  public getAppToken(): Observable<IWAppAccessTokenResponse> {
    return throwError('Not implement yet');
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

  // TODO createUserAndAutoLogin and sinup should be merged
  public createUserAndAutoLogin(pi: string, userObj?: { [key: string]: any }, anonymous?: boolean): Observable<void> {
    const userJWTRequest: IUserJWTRequest = {
      url: location.host,
      identifier: pi,
      anonymous
    };
    if (userObj) {
      userJWTRequest.profile = WhistlerAuthenticationService.UsertoWUser(userObj, pi);
    }
    return this.http.post<IJsonApiListPayload<IWCognitoLogin>>(this.createUsersEndPoint, userJWTRequest)
      .pipe(
        tap(
          (res: IJsonApiListPayload<IWCognitoLogin>) => {
            const userBearer = res.data[0].attributes.jwt;
            if (!userBearer) {
              throw new Error('Get authentication token failed!');
            }
            if (anonymous === undefined) {
              anonymous = false;
            }
            this.savePI(pi);
            this.saveAnonymous(anonymous);
            this.saveUserId(Number.parseInt(res.data[0].id, 10));
            this.saveUserAccessToken(userBearer);
          }
        ),
        map(() => void 0)
      );
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
    return this.tokenStorage.getAppInfoProperty('userAccessToken') || '';
  }

  public saveUserAccessToken(accessToken: string): void {
    this.tokenStorage.setAppInfoProperty(accessToken, 'userAccessToken');
  }

  public getAppAccessToken(): string {
    return this.tokenStorage.getAppInfoProperty('appAccessToken') || '';
  }

  public saveAppAccessToken(accessToken: string): void {
    this.tokenStorage.setAppInfoProperty(accessToken, 'appAccessToken');
  }

  public getPI(): string {
    const pi = this.tokenStorage.getAppInfoProperty('pi') || '';
    // eventually refresh window param for GTM
    if (pi !== undefined && pi !== '') {
      (window as any).primaryIdentifier = pi;
    }
    return pi;
  }

  public savePI(pi: string): void {
    this.tokenStorage.setAppInfoProperty(pi, 'pi');
    // update global property for GTM
    (window as any).primaryIdentifier = pi;
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

  public mergeUserById(fromIds: number[], toId: number): Observable<void> {
    return this.http.post<any>(this.apiHost + '/cognito/chown_requests',
      {
        data: {
          type: 'chown_requests',
          attributes: {
            from_ids: fromIds,
            to_id: toId
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      }
    );
  }

  public deleteExpressTokenCache(accountId: string): Observable<any> {
    const bodyData = {
      url: location.host,
      accountId
    };
    return this.http.post<string>(this.deleteTokenCacheEndPoint, bodyData);
  }
}
