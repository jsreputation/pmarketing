import { TranslateLoader } from '@ngx-translate/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
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
  // hostUrl is an observable to make sure we do not start fetching translation before finishing fetching the url
  private hostUrl: ReplaySubject<string> = new ReplaySubject();
  private app: string;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private tokenStorage: TokenStorage
  ) {
    this.configService.readAppConfig()
      .subscribe((config) => {
        this.app = config.app ? config.app : '';
        this.hostUrl.next(config.production ? `${config.baseHref}` : 'http://localhost:4000/');
      });
  }

  public getTranslation(lang: string): Observable<IDictionary> {
    let host: string = '/';
    return this.hostUrl.pipe(
      tap((url) => host = url),
      map((hostUrl: string) => {
        let url = `${hostUrl}lang?default=${lang}`;
        if (this.app) {
          url += `&app=${this.app}`;
        }
        return url;
      }),
      switchMap((apiAddress: string) => this.httpClient.get<IDictionary>(apiAddress, { headers: this.contentHeader, observe: 'response' })),
      tap((res: HttpResponse<IDictionary>) => {
        const l: string | null = res.headers.get('content-language') || lang;
        this.tokenStorage.setAppInfoProperty(l, 'lang');
        document.documentElement.lang = l;
      }),
      map((res: HttpResponse<IDictionary>) => res.body),
      catchError(() => this.httpClient.get<IDictionary>(`${host}assets/en.json`)),
      map((res: IDictionary | null) => res !== null ? res : {})
    );
  }
}
