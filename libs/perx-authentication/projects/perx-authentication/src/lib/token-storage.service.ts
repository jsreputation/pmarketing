import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class TokenStorage {

  // accessToken: string;
  // refreshToken: string;

  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    // const token: string = this.accessToken;
    const token: string = localStorage.getItem('accessToken') as string;
    return of(token);
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    // const token: string = this.refreshToken;
    const token: string = localStorage.getItem('refreshToken') as string;
    return of(token);
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    // this.accessToken = token;
    localStorage.setItem('accessToken', token);

    return this;
  }

  /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    // this.refreshToken = token;
    localStorage.setItem('refreshToken', token);

    return this;
  }

  /**
   * Remove tokens
   */
  public clear() {
    // this.accessToken = null;
    // this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
