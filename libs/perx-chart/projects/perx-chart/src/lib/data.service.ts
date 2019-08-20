import { Injectable } from '@angular/core';
import { IData } from './data.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, retry } from 'rxjs/operators';

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
  constructor(private http: HttpClient) { }

  public getData(id: number, params: { [key: string]: string }): Observable<IData> {
    if (id === undefined) {
      return throwError('card id cannot be undefined');
    }
    return this.getToken(id)
      .pipe(
        switchMap((token: string) => {
          const query: string = Object.keys(params)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&');

          return this.http.get<IMetabaseResponse>(
            `https://metabase-api.perxtech.io/api/embed/card/${token}/query?${query}`
          );
        }),
        map((res: IMetabaseResponse) => res.data)
      );
  }

  private getToken(id: number): Observable<string> {
    return this.http.get<ITokenResponse>(
      `https://api.whistler.perxtech.org/cognito/metabase_token/${id}`,
      { headers: { Authorization: 'Basic AFQNNUOBPRMSNLJEQCMY:y4QichclvXX4JE0DHHspZeWT3-svHbqe7B8CWklYW0KmyYPHJ0JOeg' } }
    )
      .pipe(
        retry(2),
        map((res: ITokenResponse) => res.token)
      );
  }
}
