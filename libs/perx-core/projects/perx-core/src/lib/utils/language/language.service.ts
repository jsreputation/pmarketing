import { TranslateLoader } from '@ngx-translate/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { TokenStorage } from '../storage/token-storage.service';

interface IDictionary {
  [k: string]: string;
}

@Injectable()
export class LanguageService implements TranslateLoader {
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
    this.configService.readAppConfig().subscribe((config) => {
      if (config.production) {
        this.hostUrl = `${config.baseHref}`;
      }
    });
  }
  public getTranslation(lang: string): Observable<IDictionary> {
    const apiAddress = `${this.hostUrl}lang?default=${lang}`;
    return this.httpClient.get<IDictionary>(apiAddress, { headers: this.contentHeader, observe: 'response' })
      .pipe(
        tap((res: HttpResponse<IDictionary>) => {
          const l: string | null = res.headers.get('content-language');
          this.tokenStorage.setAppInfoProperty(l || lang, 'lang');
        }),
        map((res: HttpResponse<IDictionary>) => res.body),
        catchError(() => this.httpClient.get<IDictionary>(`${this.hostUrl}assets/en-json.json`)),
        map((res: IDictionary | null) => res !== null ? res : {})
      );
  }
}
