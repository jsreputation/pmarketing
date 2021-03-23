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
  private appConfig: IConfig<any>;
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

  // recursive, but meant to be used for config which is at most 2 levels deep so is fine.
  private findPropAndSet(obj: object, id: string, value: any): void {
    if (obj) {
      for (const property in obj) {
        // eslint: guard-for-in - if statement has to wrap the whole body of a for-in
        if (obj.hasOwnProperty(property)) {
          if (typeof obj[property] === 'object') {
            this.findPropAndSet(obj[property], id, value);
          }
          if (property === id) {
            obj[property] = value;
            console.log(`${property} has been overridden with: ${value}.`);
          }
        }

      }
    }
  }
}
