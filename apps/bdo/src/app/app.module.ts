import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  AuthenticationModule,
  AuthenticationService, CampaignServiceModule as PerxSvcCampaignModule,
  ConfigModule,
  ConfigService,
  GameModule as PerxGameModule, GameServiceModule as PerxSvcGameModule,
  IConfig,
  LanguageInterceptor,
  LanguageService,
  LocaleIdFactory,
  LocationModule,
  LocationServiceModule,
  LoyaltyModule, MerchantsModule, OutcomeModule,
  ProfileModule,
  ProfileServiceModule as PerxProfileServiceModule,
  RewardsServiceModule,
  ThemesService,
  TokenStorage, VouchersModule
} from '@perxtech/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs/operators';
import { SharedModule } from './shared/shared.module';

export const appInit =
  (
    translateService: TranslateService,
    configService: ConfigService,
    authService: AuthenticationService,
    themesService: ThemesService
  ) => () => new Promise((resolve) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      authService.saveUserAccessToken(token);
    }

    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      // for currentLang registering to determine lang ver of url navigation on content.component
      tap(() => translateService.use(translateService.getBrowserLang())),
      switchMap(() => authService.getAppToken()),
      switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
  });

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    ConfigModule.forRoot({ ...environment }),

    // core modules
    AuthenticationModule,
    LocationModule,
    LocationServiceModule.forRoot(),
    LoyaltyModule.forRoot(),
    ProfileModule,
    PerxProfileServiceModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [ HttpClient, HttpBackend, ConfigService, TokenStorage ],
        useClass: LanguageService
      }
    }),

    // todo: remove after sign up dependencies fixed
    OutcomeModule,
    PerxGameModule,
    PerxSvcCampaignModule.forRoot(),
    PerxSvcGameModule.forRoot(),
    RewardsServiceModule.forRoot(),
    MerchantsModule.forRoot(), //required for locations module
    VouchersModule,

    // angular provided modules
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,

    // Material Modules
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,

    // app modules
    AppRoutingModule,
    SharedModule
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [ TranslateService, ConfigService, AuthenticationService, ThemesService ], multi: true
    },
    {
      provide: LOCALE_ID,
      deps: [ TokenStorage ],
      useFactory: LocaleIdFactory
    },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
})
export class AppModule {
}
