import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
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
  ProfileModule,
  RewardsModule
} from '@perx/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  private contentHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private hostUrl: string = 'http://localhost:4000/assets/';
  constructor(private httpClient: HttpClient) {
    if (environment.production) {
      this.hostUrl = environment.baseHref + '/assets/';
    }
  }
  public getTranslation(lang: string): Observable<any> {
    const apiAddress = this.hostUrl + `${lang}-json.json`;
    return this.httpClient.get(apiAddress, { headers: this.contentHeader })
      .pipe(
        catchError(() => this.httpClient.get(`/assets/i18n/en.json`))
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
    AuthenticationModule,
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
        deps: [HttpClient],
        useClass: CustomTranslateLoader
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService], multi: true }
  ],
})
export class AppModule { }
