import { TranslateLoader } from '@ngx-translate/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Config } from '../../config/config';
import { Injectable } from '@angular/core';
import { TokenStorage } from '../../auth/authentication/token-storage.service';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  private contentHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private hostUrl: string = 'http://localhost:4000/';
  constructor(
    private httpClient: HttpClient,
    private config: Config,
    public tokenStorage: TokenStorage
  ) {
    if (this.config.production) {
      this.hostUrl = `${this.config.baseHref}`;
    }
  }
  public getTranslation(lang: string): Observable<{ [k: string]: string }> {
    const apiAddress = `${this.hostUrl}lang?default=${lang}`;
    return this.httpClient.get<{ [k: string]: string }>(apiAddress, { headers: this.contentHeader, observe: 'response' })
      .pipe(
        tap((req) => this.tokenStorage.setAppInfoProperty(req.headers.get('content-language'), 'lang')),
        map((res) => res.body),
        catchError(() => this.httpClient.get<{ [k: string]: string }>(`${this.hostUrl}assets/en-json.json`))
      );
  }
}
