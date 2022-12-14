import { Observable, of } from 'rxjs';
import { TokenStorage } from './token-storage.service';
import { Injectable } from '@angular/core';

import { Config } from '../../config/config';
import { TokenType } from './models/token-storage.model';

interface IAppInfo {
  appAccessToken?: string;
  userAccessToken?: string;
  [others: string]: any;
}

@Injectable()
export class LocalTokenStorage extends TokenStorage {
  public appInfo: IAppInfo;
  public storageType: TokenType;

  constructor(config: Config | null) {
    super();
    if (config && config.storageType) {
      this.storageType = config.storageType === 'session' ? TokenType.local : TokenType.session;
    }
  }
  public getAppInfo(): Observable<IAppInfo> {
    const appInfo = localStorage.getItem('appInfo');
    this.appInfo = appInfo ? JSON.parse(appInfo) : { appAccessToken: '', userAccessToken: '' };
    return of(this.appInfo);
  }

  public getAppInfoProperty(key: string): string | any | undefined {
    this.getAppInfo();
    return this.appInfo[key];
  }

  public setAppInfoProperty(value: string | number | any[], key: string): void {
    this.getAppInfo();
    this.appInfo[key] = value;
    localStorage.setItem('appInfo', JSON.stringify(this.appInfo));
  }

  public clearAppInfoProperty(keys: string[]): void {
    this.getAppInfo();
    if (keys.length) {
      keys.forEach(key => delete this.appInfo[key]);
    } else {
      this.appInfo = {};
    }
    localStorage.setItem('appInfo', JSON.stringify(this.appInfo));
  }
}
