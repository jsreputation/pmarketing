import { AuthService } from 'ngx-auth';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap
} from 'rxjs/operators';
import {
  iif,
  Observable,
  of,
  throwError
} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  AuthenticationService,
  RequiresOtpError
} from './authentication.service';
import { IProfile } from '../../profile/profile.model';
import {
  IChangePasswordData,
  IChangePhoneData,
  IResetPasswordData,
  ISignUpData,
} from '../authentication/models/authentication.model';
import {
  IWAppAccessTokenResponse,
  IWLoginResponse
} from '@perxtech/whistler';
import { ProfileService } from '../../profile/profile.service';
import {
  IV4ProfileResponse,
  V4ProfileService
} from '../../profile/v4-profile.service';
import { TokenStorage } from '../../utils/storage/token-storage.service';
import { IMessageResponse } from '../../perx-core.models';
import { oc } from 'ts-optchain';
import { ConfigService } from '../../config/config.service';
import { IConfig } from '../../config/models/config.model';
import { NotificationService } from '../../utils/notification/notification.service';
import { globalCacheBusterNotifier } from 'ngx-cacheable';

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
  personal_properties?: { [key: string]: string | boolean | number };
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
  public isSignUpEnded: boolean = true;
  public preauth: boolean = false;

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        if (!config.production) {
          this.appAuthEndPoint = 'http://localhost:4000/v2/oauth';
          this.userAuthEndPoint = 'http://localhost:4000/v4/oauth';
        } else {
          this.appAuthEndPoint = `${config.baseHref}v2/oauth`;
          this.userAuthEndPoint = `${config.baseHref}v4/oauth`;
        }
        if (config.preAuth) {
          this.preauth = config.preAuth;
        }
        this.customersEndPoint = `${config.apiHost}/v4/customers`;
      });
  }

  public isAuthorized(): Observable<boolean> {
    const token = this.tokenStorage
      .getAppInfoProperty('userAccessToken');

    return of(!!token);
  }

  public refreshToken(): Observable<any> {
    if (this.preauth && this.retries < this.maxRetries) {
      this.retries++;
      this.autoLogin().subscribe(() =>
        console.log('finished refresh token')
      );
      return of(true);
    }
    this.retries = 0;
    this.logout();
    this.notificationService.addSnack('LOGIN_SESSION_EXPIRED');
    return of(true);
  }

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token');
  }

  public login(user: string, pass: string, mechId?: string, campaignId?: string, scope?: string): Observable<void> {
    return this.authenticateUser(user, pass, mechId, campaignId, scope).pipe(
      tap(
        (res: IWLoginResponse) => {
          const userBearer = res && res.bearer_token;
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.saveUserAccessToken(userBearer);
        }
      ),
      map(() => void 0),
      catchError(err => throwError(err)),
    );
  }

  public authenticateUser(user: string, pass: string, mechId?: string, campaignId?: string, scope?: string): Observable<IWLoginResponse> {
    const authenticateBody: IV4AuthenticateUserRequest = {
      url: location.host,
      username: user,
      password: pass,
      ...(mechId && { mech_id: mechId }),
      ...(campaignId && { campaign_id: campaignId }),
      ...(scope && { scope })
    };
    return this.http.post<IWLoginResponse>(`${this.userAuthEndPoint}/token`, authenticateBody);
  }

  public autoLogin(): Observable<void> {
    const user = (window as any).primaryIdentifier;
    return this.authenticateUserWithPI(user).pipe(
      tap(
        (res: IWLoginResponse) => {
          const userBearer = res && res.bearer_token;
          if (!userBearer) {
            throw new Error('Get authentication token failed!');
          }
          this.saveUserAccessToken(userBearer);
        }
      ),
      map(() => void 0),
      catchError(err => throwError(err))
    );
  }

  public authenticateUserWithPI(user: string): Observable<IWLoginResponse> {
    const authenticatePiRequest: IV4AuthenticatePiRequest = {
      url: location.host,
      identifier: user
    };

    return this.http.post<IWLoginResponse>(`${this.userAuthEndPoint}/token`, authenticatePiRequest);
  }

  public getAppToken(): Observable<IWAppAccessTokenResponse> {
    const authenticateRequest: { url: string } = {
      url: location.host
    };

    return this.http.post<IWAppAccessTokenResponse>(`${this.appAuthEndPoint}/token`, authenticateRequest).pipe(
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
    globalCacheBusterNotifier.next();
    this.tokenStorage.clearAppInfoProperty(['userAccessToken', 'pi', 'anonymous']);
  }

  public forgotPassword(phone: string): Observable<IMessageResponse> {
    const encodedPhone = encodeURIComponent(phone);
    return this.http.get<IMessageResponse>(`${this.customersEndPoint}/forget_password?phone=${encodedPhone}`)
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        ),
      );
  }

  public resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IMessageResponse> {
    return this.http.patch<IMessageResponse>(
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

  public resendOTP(phone: string): Observable<IMessageResponse> {
    const encodedURIPhone = encodeURIComponent(phone);
    // using the options.param argument prepends extra encoded characters, no idea why
    return this.http.get<IMessageResponse>(`${this.customersEndPoint}/resend_confirmation?phone=${encodedURIPhone}`)
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        ),
      );
  }

  private signUpDataToV4SignUpData(data: ISignUpData): IV4SignUpData {
    const result: IV4SignUpData = {
      last_name: data.lastName || '',
      first_name: data.firstName,
      middle_name: data.middleName,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      phone: data.phone
    };

    if (data.email) {
      result.email = data.email;
    }
    if (data.birthDay) {
      result.birthday = data.birthDay;
    }
    if (data.gender) {
      result.gender = data.gender.toLowerCase();
    }

    if (data.title || data.postcode || data.anonymous) {
      result.personal_properties = {};
    }
    if (data.title) {
      // @ts-ignore
      result.personal_properties.title = data.title;
    }
    if (data.postcode) {
      // @ts-ignore
      result.personal_properties.postcode = data.postcode;
    }
    if (data.anonymous) {
      // @ts-ignore
      result.personal_properties.anonymous = data.anonymous;
    }

    result.personal_properties = { ...result.personal_properties, ...data.customProperties };
    return result;
  }

  // @todo merge createUserAndAutoLogin with signup
  public createUserAndAutoLogin(pi: string, userObj?: { [key: string]: any }, anonymous?: boolean): Observable<void | null> {
    const profile: ISignUpData = {
      phone: pi,
      firstName: oc(userObj).firstName(undefined),
      lastName: oc(userObj).lastName(undefined),
      middleName: oc(userObj).middleName(undefined),
      email: oc(userObj).email(undefined),
      birthDay: oc(userObj).birthDay(undefined),
      gender: oc(userObj).gender(undefined),
      postcode: oc(userObj).postcode(undefined),
      title: oc(userObj).title(undefined),
      password: oc(userObj).password(undefined),
      passwordConfirmation: oc(userObj).password(undefined),
      anonymous
    };
    const otp$ = throwError(new RequiresOtpError());
    const success$ = of(void 0);
    const profileData: Observable<IProfile | null> = this.signup(profile);
    if (!profileData) {
      return of(null);
    }

    return profileData
      .pipe(
        switchMap((p: IProfile) => iif(() => p.state === 'initial', otp$, success$))
      );
  }

  public signup(profile: ISignUpData): Observable<IProfile> {
    if (!this.isSignUpEnded) {
      return throwError('OnGoingSignup');
    }

    this.isSignUpEnded = false;
    const profileV4 = this.signUpDataToV4SignUpData(profile);
    return this.http.post<IV4ProfileResponse>(`${this.customersEndPoint}/signup`, profileV4)
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => console.log(error)
        ),
        map((resp: IV4ProfileResponse) => {
          this.isSignUpEnded = true;
          return V4ProfileService.v4ProfileToProfile(resp.data);
        }),
        catchError(err => {
          this.isSignUpEnded = true;
          return throwError(err);
        })
      );
  }

  public verifyOTP(phone: string, otp: string): Observable<IMessageResponse> {
    return this.http.patch<IMessageResponse>(`${this.customersEndPoint}/confirm`, { phone, confirmation_token: otp })
      .pipe(
        tap( // Log the result or error
          data => console.log(data),
          error => {
            console.log(error);
            throwError(error);
          }
        )
      );
  }

  public requestVerificationToken(phone?: string): Observable<void> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => this.http.get<void>(
          `${this.customersEndPoint}/${profile.id}/request_verification_token${phone ? `?phone=${phone}` : ''}`
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

  public changePassword(changePasswordData: IChangePasswordData): Observable<IMessageResponse> {
    return this.profileService.whoAmI().pipe(
      mergeMap(
        (profile: IProfile) => this.http.patch<IMessageResponse>(
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
