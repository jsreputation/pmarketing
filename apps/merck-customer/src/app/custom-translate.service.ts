import { TranslateLoader } from '@ngx-translate/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ConfigService, TokenStorage } from '@perxtech/core';

interface IDictionary {
  [k: string]: string;
}

@Injectable()
export class PerxTranslateLoader extends TranslateLoader {
  private contentHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private hostUrl: string = 'http://localhost:4000/';
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private tokenStorage: TokenStorage
  ) {
    super();
    this.configService.readAppConfig().subscribe((config) => {
      if (config.production) {
        this.hostUrl = `${config.baseHref}`;
      }
    });
  }
  public getTranslation(lang: string): Observable<IDictionary | null> {
    const apiAddress = `${this.hostUrl}lang?default=${lang}`;
    return this.httpClient.get<IDictionary>(`/assets/i18n/${lang}.json`, { headers: this.contentHeader, observe: 'response' })
      .pipe(
        catchError(() =>
          this.httpClient.get<IDictionary>(apiAddress, { headers: this.contentHeader, observe: 'response' })
        ),
        catchError(() => {
          const defApiEn = `${this.hostUrl}lang?default=en-backend.json`;
          return this.httpClient.get<IDictionary>(defApiEn, { headers: this.contentHeader, observe: 'response' });
        }))
      .pipe(
        tap((response: HttpResponse<IDictionary>) =>
          this.tokenStorage.setAppInfoProperty(response.headers.get('content-language') || lang, 'lang')),
        map((response: HttpResponse<IDictionary>) => response.body)
      );
  }
}
