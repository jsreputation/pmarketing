import { Observable, of } from 'rxjs';
import { TokenStorage } from './token-storage.service';
import { Injectable } from '@angular/core';
import { TokenType } from './models/authentication.model';
import { Config } from '../../config/config';

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
      this.storageType = config.storageType;
    }
  }
  public getAppInfo(): Observable<IAppInfo> {
    this.appInfo = JSON.parse(localStorage.getItem('appInfo')) || { appAccessToken: '', userAccessToken: '' };
    return of(this.appInfo);
  }

  public getAppInfoProperty(key: string): string {
    this.getAppInfo();
    return this.appInfo[key];
  }

  public setAppInfoProperty(value: string, key: string): void {
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
