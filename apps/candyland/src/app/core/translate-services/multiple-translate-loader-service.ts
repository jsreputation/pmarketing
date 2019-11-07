import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@cl-environments/environment';
import { ApiConfig } from '@cl-core/api-config';
import { Injectable } from '@angular/core';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';

export const translateLoader = (http: HttpClient, resources: { prefix: string, suffix: string }[]) => {
  return new MultiTranslateHttpLoader(http, resources);
};

@Injectable()
export class MultiTranslateHttpLoader implements TranslateLoader {

  public hostUrl: string = `http://localhost:4200`;
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
      return this.http.get(`${config.prefix}${lang}${config.suffix}`, { headers: this.contentHeader });
    });
    return forkJoin(queryList)
      .pipe(map(response => {
        return response.reduce((a, b) => {
          return Object.assign(a, b);
        });
      }));
  }
}

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
