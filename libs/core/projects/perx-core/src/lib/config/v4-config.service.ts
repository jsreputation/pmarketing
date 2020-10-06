import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  of,
  Observable,
} from 'rxjs';
import {
  tap,
  shareReplay,
} from 'rxjs/operators';

import {
  IConfig,
} from './models/config.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class V4ConfigService extends ConfigService {
  private appConfig: IConfig<any> | undefined;
  private _appStarted: boolean = false;
  public appStarted: boolean = false;

  private appConfig$: Observable<IConfig<any>> | undefined;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public readAppConfig<T>(): Observable<IConfig<T>> {
    if (this.appConfig) {
      return of(this.appConfig);
    }
    if (!this.appConfig$) {
      this.appConfig$ = this.http.get<IConfig<T>>('assets/config/app-config.json').pipe(
        tap((appConfig: IConfig<T>) => this.appConfig = appConfig),
        shareReplay(1)
      );
    }
    return this.appConfig$;
  }

  public setAppStarted(): void {
    this._appStarted = true;
    this.appStarted = this._appStarted;
  }

  public readAppStarted(): boolean {
    return this.appStarted;
  }
}
