import { TranslateLoader } from '@ngx-translate/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  private contentHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private hostUrl: string = 'http://localhost:4000/';
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.configService.readAppConfig().subscribe((config) => {
      if (config.production) {
        this.hostUrl = `${config.baseHref}`;
      }
    });
  }
  public getTranslation(lang: string): Observable<{ [k: string]: string }> {
    const apiAddress = `${this.hostUrl}lang?default=${lang}`;
    return this.httpClient.get<{ [k: string]: string }>(apiAddress, { headers: this.contentHeader })
      .pipe(
        catchError(() => this.httpClient.get<{ [k: string]: string }>(`${this.hostUrl}assets/en-json.json`))
      );
  }
}
