import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import enGb from '@angular/common/locales/en-GB';
import localesEnGbExtra from '@angular/common/locales/extra/en-GB';
import localesFrExtra from '@angular/common/locales/extra/fr';
import localesKoExtra from '@angular/common/locales/extra/ko';
import localesRuExtra from '@angular/common/locales/extra/ru';
import localesViExtra from '@angular/common/locales/extra/vi';
import localeZhExtra from '@angular/common/locales/extra/zh';
import fr from '@angular/common/locales/fr';
import ko from '@angular/common/locales/ko';
import ru from '@angular/common/locales/ru';
import vi from '@angular/common/locales/vi';
import zh from '@angular/common/locales/zh';
import { APP_INITIALIZER, ErrorHandler, Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthenticationService, CampaignServiceModule as PerxSvcCampaignModule, ConfigModule, ConfigService, GameServiceModule as PerxSvcGameModule, IConfig, LanguageService, LocaleIdFactory, SettingsModule, ThemesService, TokenStorage, UtilsModule, AuthenticationModule, ProfileModule } from '@perxtech/core';
import * as Sentry from '@sentry/browser';
import * as Hammer from 'hammerjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    Sentry.captureException(error.originalError || error);
    if (!environment.production) {
      console.error(error);
    }
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
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    PerxSvcGameModule.forRoot(),
    PerxSvcCampaignModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    }),
    UtilsModule,
    AuthenticationModule,
    ProfileModule,
    AppRoutingModule,
    MatSnackBarModule
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
    }
  ]
})
export class AppModule { }
