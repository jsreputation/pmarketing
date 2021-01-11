import {
  NgModule,
  APP_INITIALIZER,
  LOCALE_ID,
  Injectable,
  ErrorHandler,
} from '@angular/core';
import {
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpBackend,
} from '@angular/common/http';
import {
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import enGb from '@angular/common/locales/en-GB';
import localesEnGbExtra from '@angular/common/locales/extra/en-GB';
import zh from '@angular/common/locales/zh';
import localeZhExtra from '@angular/common/locales/extra/zh';
import ru from '@angular/common/locales/ru';
import localesRuExtra from '@angular/common/locales/extra/ru';
import vi from '@angular/common/locales/vi';
import localesViExtra from '@angular/common/locales/extra/vi';
import ko from '@angular/common/locales/ko';
import localesKoExtra from '@angular/common/locales/extra/ko';
import fr from '@angular/common/locales/fr';
import localesFrExtra from '@angular/common/locales/extra/fr';

import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';

import {
  PerxCoreModule,
  AuthenticationModule,
  UtilsModule,
  ConfigModule,
  GameModule as PerxGameModule,
  GameServiceModule as PerxSvcGameModule,
  MerchantsModule as PerxMerchantsModule,
  CampaignModule as PerxCampaignModule,
  CampaignServiceModule as PerxSvcCampaignModule,
  StampModule as PerxStampModule,
  VouchersModule,
  OutcomeModule,
  ProfileModule,
  ProfileServiceModule as PerxProfileServiceModule,
  RewardsModule,
  LanguageService,
  TokenStorage,
  ConfigService,
  LocaleIdFactory,
  SettingsModule,
  AuthenticationService,
  ThemesService,
  IConfig,
  LoyaltyModule,
  LanguageInterceptor,
  TransactionsServiceModule as PerxTransactionsServiceModule,
} from '@perxtech/core';

import * as Hammer from 'hammerjs';
import * as Sentry from '@sentry/browser';
import { switchMap, tap } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpModule } from './sign-up/sign-up.module';
import { environment } from '../environments/environment';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ErrorComponent } from './error/error.component';
import { ReferralPopupComponent } from './campaign-referrals/referral-popup/referral-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// https://medium.com/angular-in-depth/gestures-in-an-angular-application-dde71804c0d0
// to override default settings

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  public overrides: any = {
    swipe: { direction: Hammer.DIRECTION_ALL }, // in order to swipe up and down
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

Sentry.init({
  dsn: 'https://736f7fc0afd74f4383fdc760f7c81e5a@sentry.io/1827240'
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

// use en-GB as the default english flavour
registerLocaleData(enGb, 'en', localesEnGbExtra);

registerLocaleData(zh, 'zh', localeZhExtra);
registerLocaleData(ru, 'ru', localesRuExtra);
registerLocaleData(vi, 'vi', localesViExtra);
registerLocaleData(ko, 'ko', localesKoExtra);
registerLocaleData(fr, 'fr', localesFrExtra);

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
  declarations: [
    AppComponent,
    ErrorComponent,
    ReferralPopupComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    AuthenticationModule,
    PerxSvcGameModule.forRoot(),
    PerxGameModule,
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    OutcomeModule,
    SignUpModule,
    BrowserAnimationsModule,
    PerxMerchantsModule.forRoot(),
    PerxStampModule,
    ProfileModule,
    PerxProfileServiceModule.forRoot(),
    UtilsModule,
    PerxSvcCampaignModule.forRoot(),
    PerxCampaignModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    PerxTransactionsServiceModule.forRoot(),
    LoyaltyModule.forRoot(),
    RewardsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ForgotPasswordModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService], multi: true
    },
    // Locale Id factory ensures the Locale Id matches whatever translation is available in the backend.
    {
      provide: LOCALE_ID,
      deps: [TokenStorage],
      useFactory: LocaleIdFactory
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
  entryComponents: [
    ReferralPopupComponent
  ]
})
export class AppModule { }
