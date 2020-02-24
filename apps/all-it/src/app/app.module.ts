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
  VouchersModule,
  OutcomeModule,
  ProfileModule,
  RewardsModule,
  TokenStorage,
  LanguageService,
  ConfigService,
  AuthenticationService,
  ThemesService,
  IConfig
} from '@perx/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { tap, switchMap } from 'rxjs/operators';

export const setLanguage = (
  translateService: TranslateService,
  configService: ConfigService,
  authService: AuthenticationService,
  themesService: ThemesService) =>
  () => new Promise((resolve) => {
    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      switchMap(() => authService.getAppToken()),
      switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
  });

@NgModule({
  declarations: [AppComponent],
  imports: [
    InfiniteScrollModule,
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    OutcomeModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    PerxMerchantsModule,
    PerxStampModule,
    ProfileModule,
    UtilsModule,
    PerxCampaignModule,
    HttpClientModule,
    RewardsModule,
    MatDialogModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService],
      multi: true
    }
  ],
})
export class AppModule { }
