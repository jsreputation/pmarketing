import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  MerchantsModule,
  AuthenticationModule,
  LoyaltyModule,
  GameModule,
  UtilsModule,
  ProfileModule,
  ConfigModule,
  CampaignModule,
  RewardsModule,
  AuthenticationService,
  ThemesService,
  IConfig,
  ConfigService,
  TokenStorage,
  LanguageService,
  CampaignServiceModule
} from '@perxtech/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatRippleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatSnackBarModule,
} from '@angular/material';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { PromosComponent } from './promos/promos.component';
import { PromosComponent as PromosStagingComponent } from './promos/promos.component.staging';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { SmsValidationComponent } from './auth/sms-validation/sms-validation.component';
import { QRCodeComponent } from './qr-code/qr-code.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { PopupComponent } from './popup/popup.component';
import { registerLocaleData } from '@angular/common';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { tap, switchMap } from 'rxjs/operators';

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
    LoginComponent,
    HomeComponent,
    RedeemComponent,
    HistoryComponent,
    PromosComponent,
    PromosStagingComponent,
    SignUpComponent,
    ForgotPinComponent,
    SmsValidationComponent,
    QRCodeComponent,
    PopupComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    MerchantsModule.forRoot(),
    AuthenticationModule,
    GameModule,
    ProfileModule,
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
    RewardsModule.forRoot(),
    NgxBarcodeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setLanguage,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService], multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
  ],
  entryComponents: [PopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
