import { Observable  } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ISignUpData,
  IMessageResponse,
  IResetPasswordData,
  IAppAccessTokenResponse,
  IChangePasswordData
} from './models/authentication.model';
import { IProfile } from '../../profile/profile.model';

export abstract class AuthenticationService {
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

  public abstract async autoLogin(): Promise<boolean>;

  public abstract userAuth(bearer: string): Observable<any>;

  public abstract async v4GameOauth(user: string, pass: string, mechId?: string, campaignId?: string): Promise<boolean>;

  public abstract async v4AutoLogin(): Promise<boolean>;

  public abstract preAuth(): Observable<any>;
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
}
