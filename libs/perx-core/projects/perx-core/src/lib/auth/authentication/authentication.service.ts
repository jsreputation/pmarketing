import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ISignUpData,
  IMessageResponse,
  IResetPasswordData,
  IAppAccessTokenResponse,
  IChangePasswordData,
  IChangePhoneData
} from './models/authentication.model';
import { IProfile, IProfileAttributes } from '../../profile/profile.model';
import { AuthService } from 'ngx-auth';

export abstract class AuthenticationService implements AuthService {
  public abstract get $failedAuth(): Observable<boolean>;

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @memberOf AuthService
   */
  public abstract isAuthorized(): Observable<boolean>;

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   */
  public abstract refreshToken(): Observable<any>;

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentially checks status
   */
  public abstract refreshShouldHappen(response: HttpErrorResponse): boolean;

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   */
  public abstract verifyTokenRequest(url: string): boolean;

  /**
   * EXTRA AUTH FUNCTIONS
   */

  public abstract login(user: string, pass: string, mechId?: string, campaignId?: string, scope?: string): Observable<any>;

  public abstract autoLogin(): Observable<any>;
  public abstract createUserAndAutoLogin(pi: string, userObj?: IProfileAttributes): Observable<any>;
  /**
   * This is important, for those public pages, API require app level access token in request header
   * Please add this call in every first page of the app to make sure those public page's API call works
   */
  public abstract getAppToken(): Observable<IAppAccessTokenResponse>;

  public abstract setInterruptedUrl(url: string): void;

  public abstract getInterruptedUrl(): string;

  public abstract logout(): void;

  /**
   * This method will send an OTP to the user. This otp should be used as input
   * of method resetPassword.
   */
  public abstract forgotPassword(phone: string): Observable<IMessageResponse>;

  public abstract resetPassword(resetPasswordInfo: IResetPasswordData): Observable<IMessageResponse>;

  public abstract resendOTP(phone: string): Observable<IMessageResponse>;

  public abstract signup(profile: ISignUpData): Observable<IProfile>;

  public abstract verifyOTP(phone: string, otp: string): Observable<IMessageResponse>;

  public abstract requestVerificationToken(phone?: string): Observable<void>;

  public abstract changePhone(changePhoneData: IChangePhoneData): Observable<void>;

  public abstract changePassword(changePasswordData: IChangePasswordData): Observable<IMessageResponse>;

  /**
   * Get access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */

  public abstract getAccessToken(): Observable<string>;

  /**
   * Get user access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */

  public abstract getUserAccessToken(): string;

  /**
   * Set user access token
   * @description Should set user access token in Observable from e.g.
   * localStorage
   */

  public abstract saveUserAccessToken(accessToken: string): void;

  /**
   * Get user access token
   * @description Should return user access token in Observable from e.g.
   * localStorage
   */

  public abstract getAppAccessToken(): string;

  /**
   * Set access token
   * @description Should set user access token in Observable from e.g.
   * localStorage
   */

  public abstract saveAppAccessToken(accessToken: string): void;

  public abstract getPI(): string;

  public abstract savePI(pi: string): void;

  public abstract mergeUserById(fromIds: string[], toId: string): Observable<void>;
}
