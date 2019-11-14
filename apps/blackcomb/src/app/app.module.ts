import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  AuthenticationModule,
  UtilsModule,
  ConfigModule,
  MerchantsModule as PerxMerchantsModule,
  CampaignModule as PerxCampaignModule,
  StampModule as PerxStampModule,
  VouchersModule,
  OutcomeModule,
  ProfileModule,
  RewardsModule,
  TokenStorage,
} from '@perx/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { ServiceWorkerModule } from '@angular/service-worker';
import { SignUpModule } from './sign-up/sign-up.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import localeZhExtra from '@angular/common/locales/extra/zh';
import ru from '@angular/common/locales/ru';
import localesRuExtra from '@angular/common/locales/extra/ru';

registerLocaleData(zh, 'zh', localeZhExtra);
registerLocaleData(ru, 'ru', localesRuExtra);

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  private contentHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private hostUrl: string = 'http://localhost:4000/';
  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorage
  ) {
    if (environment.production) {
      this.hostUrl = `${environment.baseHref}`;
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

export const setLanguage = (translateService: TranslateService) => () => new Promise((resolve) => {
  translateService.setDefaultLang(environment.defaultLang);
  resolve();
});
@NgModule({
  declarations: [AppComponent],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    OutcomeModule,
    AuthenticationModule,
    SignUpModule,
    ProfileModule,
    BrowserAnimationsModule,
    PerxMerchantsModule,
    PerxStampModule,
    ProfileModule,
    UtilsModule,
    PerxCampaignModule,
    HttpClientModule,
    RewardsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, TokenStorage],
        useClass: CustomTranslateLoader
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService], multi: true },
    { provide: LOCALE_ID, useValue: environment.defaultLang }
  ],
})
export class AppModule { }
