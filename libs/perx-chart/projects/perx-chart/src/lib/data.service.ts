import { Injectable } from '@angular/core';
import { IData } from './data.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  map,
  switchMap,
  retry
} from 'rxjs/operators';
import { EnvConfig } from './env.config';

interface ITokenResponse {
  token: string;
}

interface IMetabaseResponse {
  data: IData;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public tokenBasePath: string = null; // 'https://api-dev1.uat.whistler.perxtech.io';
  constructor(private http: HttpClient, config?: EnvConfig) {
    if (config && config.tokenBasePath) {
      this.tokenBasePath = config.tokenBasePath;
    }
  }

  public getData(id: number, params: { [key: string]: string }): Observable<IData> {
    if (id === undefined) {
      return throwError('card id cannot be undefined');
    }
    const query: string = params ? Object.keys(params)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&') : '';
    return this.getToken(id)
      .pipe(
        switchMap((token: string) => this.http.get<IMetabaseResponse>(
            `https://metabase-api.perxtech.io/api/embed/card/${token}/query?${query}`
          )),
        map((res: IMetabaseResponse) => res.data)
      );
  }

  private getToken(id: number): Observable<string> {
    return this.http.get<ITokenResponse>(`${this.tokenBasePath}/cognito/metabase_token/${id}`)
      .pipe(
        retry(2),
        map((res: ITokenResponse) => res.token)
      );
  }
}
