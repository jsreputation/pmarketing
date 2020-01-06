import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID, Injectable, ErrorHandler } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Hammer from 'hammerjs';

// https://medium.com/angular-in-depth/gestures-in-an-angular-application-dde71804c0d0
// to override default settings
export class MyHammerConfig extends HammerGestureConfig {
  public overrides: any =  {
    swipe: { direction: Hammer.DIRECTION_ALL }, // in order to swipe up and down
    pinch: { enable: false },
    rotate: { enable: false }
  };
}
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
  LanguageService,
  TokenStorage,
  ConfigService,
  LocaleIdFactory
} from '@perx/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { MatDialogModule, MatSnackBarModule } from '@angular/material';

import { ServiceWorkerModule } from '@angular/service-worker';
import { SignUpModule } from './sign-up/sign-up.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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

import * as Sentry from '@sentry/browser';
import {RewardPopupComponent} from './reward-popup/reward-popup.component';
import {ExpireTimerComponent} from './reward-popup/expire-timer/expire-timer.component';
import {MatButtonModule} from '@angular/material/button';

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

export const setLanguage = (translateService: TranslateService) => () => new Promise((resolve) => {
  translateService.setDefaultLang(environment.defaultLang);
  resolve();
});
@NgModule({
  declarations: [
    AppComponent,
    RewardPopupComponent,
    ExpireTimerComponent
  ],
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
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    RewardsModule,
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
    { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService], multi: true },
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
    }
  ],
  entryComponents: [RewardPopupComponent]
})
export class AppModule { }
