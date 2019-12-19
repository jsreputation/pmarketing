import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { Observable, throwError } from 'rxjs';
import {
  map,
  switchMap,
  retry,
  tap,
} from 'rxjs/operators';

import { EnvConfig } from './env.config';
import {
  DataSerializer,
  IData,
  BaseType,
} from './data.model';

interface ITokenResponse {
  token: string;
}

interface IMetabaseResponse {
  data: IData;
}

export enum ReportFormat {
  csv = 'csv',
  xlsx = 'xlsx',
  json = 'json'
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public tokenBasePath: string | null = null; // 'https://api-dev1.uat.whistler.perxtech.io';
  private metabasePath: string = 'https://metabase-api.perxtech.io';

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    config?: EnvConfig
  ) {
    if (config && config.tokenBasePath) {
      this.tokenBasePath = config.tokenBasePath;
    }
  }

  public getData(id: number | string, params: { [key: string]: string }): Observable<IData> {
    if (id === undefined) {
      return throwError('card id cannot be undefined');
    }
    return this.getToken(id)
      .pipe(
        switchMap((token: string) => {
          const query: string = params ? Object.keys(params)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&') : '';

          return this.http.get<IMetabaseResponse>(
            `${this.metabasePath}/api/embed/card/${token}/query?${query}`
          );
        }),
        map((res: IMetabaseResponse) => DataSerializer.from(res.data)),
        tap((data: IData) => {
          data.cols.map(col => {
            if (col.base_type.indexOf(BaseType.date) === -1) {
              return;
            }
            const i: number = col.base_type.indexOf(BaseType.date);
            data.rows.map(row => {
              row[i] = this.datePipe.transform(row[i], 'mediumDate');
            });
          });
        }));
  }

  private getToken(id: number | string): Observable<string> {
    return this.http.get<ITokenResponse>(`${this.tokenBasePath}/cognito/metabase_token/${id}`)
      .pipe(
        retry(2),
        map((res: ITokenResponse) => res.token)
      );
  }

  public getReport(
    id: number | string,
    params: { [key: string]: string } = {},
    format: ReportFormat = ReportFormat.csv
  ): Observable<string> {
    return this.getToken(id)
      .pipe(
        switchMap((token: string) => {
          const query: string = params ? Object.keys(params)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&') : '';

          return this.http.get(`${this.metabasePath}/api/embed/card/${token}/query/${format}?${query}`, { responseType: 'text' });
        })
      );
  }
}
