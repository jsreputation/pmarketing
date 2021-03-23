import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  of,
} from 'rxjs';
import {
  shareReplay,
  tap,
} from 'rxjs/operators';

import { IConfig, } from './models/config.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class V4ConfigService extends ConfigService {
  private appConfig: IConfig<any> | undefined;
  private appStarted: boolean = false;
  public APP_STARTED: boolean = false;

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
    this.appStarted = true;
    this.APP_STARTED = this.appStarted;
  }

  public readAppStarted(): boolean {
    return this.appStarted;
  }

  public setOverrideFlag(flag: string, value: any): void {
    this.findPropAndSet(this.appConfig, flag, value);
  }

  // recursive, but
  private findPropAndSet(obj, id, value): void {
    for (let property in obj) {
      if( obj.hasOwnProperty(property) && typeof obj[property] === 'object' ) {
        this.findPropAndSet(obj[property], id, value);
      }
      if (property === id) {
        obj[property] = value;
        console.log(`${property} has been overridden with: ${value}.`)
      }
    }
  }
}
