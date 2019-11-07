import { Injectable } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@cl-environments/environment';
import { ApiConfig } from '@cl-core/api-config';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';

export const setLanguage = (
  translateService: TranslateService,
  translateDefaultLanguage: TranslateDefaultLanguageService
  ) => () => new Promise((resolve) => {
  const listLanguages = ['en', 'ru'];
  let language: string;
  if (navigator) {
    language = (navigator.language || (navigator as any).userLanguage).slice(0, 3);
    if (!listLanguages.includes(language)) {
      language = 'en';
    }
  }

  translateDefaultLanguage.setDefaultLanguage(language);
  translateService.setDefaultLang(language);
  resolve();
});

export const TranslateCustomsLoader = (httpClient: HttpClient, path: string) => {
  return new TranslateLoaderService(httpClient, path);
};

@Injectable()
export class TranslateLoaderService implements TranslateLoader {
  private contentHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  public hostUrl: string = `http://localhost:4200${this.path}`;
  constructor(public httpClient: HttpClient,
              public path: string
  ) {
    if (environment.production) {
      this.hostUrl = `${ApiConfig.basePath}${this.path}`;
    }
  }
  public getTranslation(lang: string): Observable<{ [k: string]: string }> {
    const apiAddress = `${this.hostUrl}${lang}.json`;
    return this.httpClient.get<{ [k: string]: string }>(apiAddress, { headers: this.contentHeader })
      .pipe(
        catchError(() => this.httpClient.get<{ [k: string]: string }>(`${this.hostUrl}assets/en-json.json`))
      );
  }
}
