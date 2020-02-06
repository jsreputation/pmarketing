import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  of,
  Observable,
} from 'rxjs';
import {
  tap,
} from 'rxjs/operators';

import {
  IConfig,
} from './models/config.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class V4ConfigService extends ConfigService {
  private appConfig: IConfig<any>;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public readAppConfig<T>(): Observable<IConfig<T>> {
    if (this.appConfig) {
      return of(this.appConfig);
    }
    return this.http.get<IConfig<T>>('assets/config/app-config.json').pipe(
      tap((appConfig: IConfig<T>) => this.appConfig = appConfig)
    );
  }

}
