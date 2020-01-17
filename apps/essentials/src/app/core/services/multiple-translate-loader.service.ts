import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '@es-core/api-config';
import { TranslateDefaultLanguageService } from '@es-core/services/translate-default-language.service';
import { environment } from '@es-environments/environment';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export const translateLoader = (
  http: HttpClient,
  resources: { prefix: string, suffix: string }[]) => {
  return new MultiTranslateHttpLoader(http, resources);
};

@Injectable()
export class MultiTranslateHttpLoader implements TranslateLoader {

  public hostUrl: string = `http://localhost:4203`;
  public contentHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private http: HttpClient, public resources: { prefix: string, suffix: string }[] = [{
    prefix: '/assets/i18n/', suffix: '.json'
  }]) {
    if (environment.production) {
      this.hostUrl = `${ApiConfig.basePath}`;
    }
  }

  public getTranslation(lang: string): any {
    const queryList: Observable<any>[] = this.resources.map(config => {
      return this.http.get(`${config.prefix}${lang}${config.suffix}`, {headers: this.contentHeader});
    });
    return forkJoin(queryList)
      .pipe(map(response => {
        return response.reduce((a, b) => {
          return Object.assign(a, b);
        });
      }));
  }
}

export const getDefaultLanguage = () => {
  const listLanguages = ['en', 'ru'];
  const language = (navigator && (navigator.language || (navigator as any).userLanguage)).slice(0, 3);
  if (listLanguages.includes(language)) {
    return language;
  }
  return 'en';
};

export const setLanguage = (
  translateService: TranslateService,
  translateDefaultLanguage: TranslateDefaultLanguageService
) => () => new Promise((resolve) => {
  const language = getDefaultLanguage();

  translateDefaultLanguage.setDefaultLanguage(language);
  translateService.setDefaultLang(language);
  resolve();
});
