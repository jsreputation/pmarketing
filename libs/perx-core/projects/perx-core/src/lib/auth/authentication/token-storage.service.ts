import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface IAppInfo {
  appAccessToken?: string;
  userAccessToken?: string;
  [others: string]: any;
}

@Injectable()
export class TokenStorage {

  public appInfo: IAppInfo;

  /**
   * Get User Info
   */
  public getAppInfo(): Observable<IAppInfo> {
    this.appInfo = JSON.parse(localStorage.getItem('appInfo')) || {appAccessToken: '', userAccessToken: ''};
    return of(this.appInfo);
  }

  /**
   * Get appInfo property
   */
  public getAppInfoProperty(key: string): Observable<string> {
    this.getAppInfo();
    const result: string = this.appInfo[key];
    return of(result);
  }

  /**
   * Set appInfo property
   */
  public setAppInfoProperty(value: string, key: string): void {
    this.getAppInfo();
    this.appInfo[key] = value;
    localStorage.setItem('appInfo', JSON.stringify(this.appInfo));
  }

  /**
   * Remove appInfo property
   */
  public clearAppInfoProperty(key: string): void {
    this.getAppInfo();
    if (key) {
      delete this.appInfo[key];
    } else {
      this.appInfo = {};
    }
    localStorage.setItem('appInfo', JSON.stringify(this.appInfo));
  }
}
