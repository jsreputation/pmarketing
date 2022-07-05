import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AuthenticationModule,
  AuthenticationService,
  BadgeServiceModule,
  CampaignModule,
  CampaignServiceModule,
  ConfigModule,
  ConfigService,
  GameModule,
  GameServiceModule,
  IConfig, InstantOutcomeTransactionServiceModule,
  LanguageInterceptor,
  LanguageService,
  LocationServiceModule,
  LoyaltyModule,
  MerchantsModule,
  PerxCoreModule,
  ProfileModule,
  ProfileServiceModule,
  QuestModule,
  RewardsServiceModule,
  SettingsModule,
  ThemesService,
  TokenStorage,
  UtilsModule,
  VouchersModule
} from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule, } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { PromosComponent } from './promos/promos.component';
import { PromosComponent as PromosProdComponent } from './promos/promos.component.prod';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { SmsValidationComponent } from './auth/sms-validation/sms-validation.component';
import { QRCodeComponent } from './qr-code/qr-code.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { PopupComponent } from './popup/popup.component';
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService, } from '@ngx-translate/core';
import { switchMap, tap } from 'rxjs/operators';

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
import { WalletHistoryModule } from '@perxtech/blackcomb-pages';
import { VerificationOtpComponent } from './profile/verification-otp/verification-otp.component';

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
  themesService: ThemesService
) => () =>
  new Promise((resolve) => {
    configService
      .readAppConfig()
      .pipe(
        tap((config: IConfig<void>) =>
          translateService.setDefaultLang(config.defaultLang || 'en')
        ),
        switchMap(() => authService.getAppToken()),
        switchMap(() => themesService.getThemeSetting())
      )
      .toPromise()
      .then(() => resolve());
  });

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistoryComponent,
    PromosComponent,
    PromosProdComponent,
    SignUpComponent,
    ForgotPinComponent,
    SmsValidationComponent,
    QRCodeComponent,
    PopupComponent,
    VerificationOtpComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    MerchantsModule.forRoot(),
    AuthenticationModule,
    GameModule,
    GameServiceModule.forRoot(),
    ProfileModule,
    ProfileServiceModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    UtilsModule,
    LoyaltyModule.forRoot(),
    MatCheckboxModule,
    HttpClientModule,
    CampaignModule,
    CampaignServiceModule.forRoot(),
    RewardsServiceModule.forRoot(),
    NgxBarcode6Module,
    LocationServiceModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage],
        useClass: LanguageService,
      },
    }),
    WalletHistoryModule,
    QuestModule.forRoot(),
    BadgeServiceModule.forRoot(),
    InstantOutcomeTransactionServiceModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [
        TranslateService,
        ConfigService,
        AuthenticationService,
        ThemesService,
      ],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
  ],
  entryComponents: [PopupComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
