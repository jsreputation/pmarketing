import { BrowserModule } from '@angular/platform-browser';
import {
  APP_INITIALIZER,
  ErrorHandler,
  Injectable,
  LOCALE_ID,
  NgModule
} from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthenticationModule,
  AuthenticationService,
  BadgeServiceModule,
  CampaignModule as PerxCampaignModule,
  CampaignServiceModule as PerxCampaignServiceModule,
  ConfigModule,
  ConfigService,
  GameModule as PerxGameModule,
  GameServiceModule,
  IConfig, InstantOutcomeTransactionServiceModule,
  LanguageInterceptor,
  LanguageService,
  LocationServiceModule,
  LoyaltyModule,
  MerchantsModule as PerxMerchantsModule,
  OutcomeModule,
  PerxCoreModule,
  ProfileModule,
  ProfileServiceModule,
  ProgressCampaignServiceModule as PerxProgressCampaignServiceModule,
  QuestModule as PerxQuestModule,
  RewardsModule,
  RewardsServiceModule,
  SettingsModule,
  StampModule as PerxStampModule,
  ThemesService,
  TokenStorage,
  TransactionsServiceModule as PerxTransactionsServiceModule,
  UtilsModule,
  VouchersModule
} from '@perxtech/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// import { ServiceWorkerModule } from '@angular/service-worker';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  switchMap,
  tap
} from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { SignupModule } from './signup/signup.module';
import * as Sentry from '@sentry/browser';
import { registerLocaleData } from '@angular/common';
import localeENMY from '@angular/common/locales/en-MY';
import localesEnMyExtra from '@angular/common/locales/extra/en-MY';

Sentry.init({
  dsn: 'https://813ab4ad94c94d5eb4370961b9e31e81@o225970.ingest.sentry.io/5276501'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  public handleError(error: any): void {
    // const eventId =
    Sentry.captureException(error.originalError || error);
    if (!environment.production) {
      console.error(error);
    }
    // Sentry.showReportDialog({ eventId });
  }
}
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
registerLocaleData(localeENMY, 'en', localesEnMyExtra);

@NgModule({
  declarations: [AppComponent],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    GameServiceModule.forRoot(),
    PerxGameModule,
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    OutcomeModule,
    InstantOutcomeTransactionServiceModule.forRoot(),
    AuthenticationModule,
    SignupModule,
    ProfileModule,
    ProfileServiceModule.forRoot(),
    BrowserAnimationsModule,
    PerxMerchantsModule.forRoot(),
    PerxStampModule,
    ProfileModule,
    UtilsModule,
    PerxCampaignServiceModule.forRoot(),
    PerxCampaignModule,
    PerxProgressCampaignServiceModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    PerxQuestModule.forRoot(),
    BadgeServiceModule.forRoot(),
    LoyaltyModule.forRoot(),
    PerxTransactionsServiceModule.forRoot(),
    RewardsModule,
    RewardsServiceModule.forRoot(),
    LocationServiceModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-GB' },
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
})
export class AppModule { }
