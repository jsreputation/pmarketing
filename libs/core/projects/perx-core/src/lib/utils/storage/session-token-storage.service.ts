import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { TokenStorage } from './token-storage.service';
import { IConfig } from '../../config/models/config.model';
import { TokenType } from './models/token-storage.model';

interface IAppInfo {
  appAccessToken?: string;
  userAccessToken?: string;
  [others: string]: any;
}

interface ITokenConfig {
  storageType?: string;
}
@Injectable({
  providedIn: 'root'
})
export class SessionTokenStorageService extends TokenStorage {

  constructor(
    private http: HttpClient
  ) {
    super();
    this.http.get<IConfig<ITokenConfig>>('assets/config/app-config.json').pipe(
      tap((appConfig: IConfig<ITokenConfig>) => this.storageType = appConfig.custom?.storageType === 'session' ? TokenType.session: TokenType.local),
      shareReplay(1)
    );
  }

  public getAppInfo(): Observable<IAppInfo> {
    const appInfo = sessionStorage.getItem('appInfo');
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
    sessionStorage.setItem('appInfo', JSON.stringify(this.appInfo));
  }

  public clearAppInfoProperty(keys: string[]): void {
    this.getAppInfo();
    if (keys.length) {
      keys.forEach(key => delete this.appInfo[key]);
    } else {
      this.appInfo = {};
    }
    sessionStorage.setItem('appInfo', JSON.stringify(this.appInfo));
  }
}
