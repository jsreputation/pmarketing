import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { switchMap, tap } from 'rxjs/operators';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AuthenticationModule,
  AuthenticationService,
  ConfigModule,
  ConfigService,
  IConfig,
  InstantOutcomeTransactionServiceModule,
  LanguageInterceptor,
  LanguageService,
  LocaleIdFactory,
  ProfileServiceModule as PerxProfileServiceModule,
  SettingsModule,
  SettingsService,
  ThemesService,
  TokenStorage,
  UtilsModule,
  MerchantAdminModule,
  RewardsModule,
  LoyaltyModule
} from '@perxtech/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentifyCustomerComponent } from './identify-customer/identify-customer.component';
import { MerchantQrscannerModule } from '@perxtech/bcm-pages';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReserveOrderItemsComponent } from './sales-record/reserve-order-items/reserve-order-items.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectRecordTypeComponent } from './sales-record/select-record-type/select-record-type.component';
import { CreateRecordComponent } from './sales-record/create-record/create-record.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { OrderSummaryComponent } from './sales-record/order-summary/order-summary.component';

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
      switchMap(() => authService.getAppToken()),
      switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
  });
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IdentifyCustomerComponent,
    HomeComponent,
    ReserveOrderItemsComponent,
    SelectRecordTypeComponent,
    CreateRecordComponent,
    OrderSummaryComponent,
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    SettingsModule.forRoot({ ...environment }),
    BrowserModule,
    MatToolbarModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    UtilsModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MatIconModule,
    PerxProfileServiceModule.forRoot(),
    InstantOutcomeTransactionServiceModule.forRoot(),
    MatTabsModule,
    MatButtonModule,
    MerchantQrscannerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MerchantAdminModule,
    RewardsModule.forRoot(),
    ZXingScannerModule,
    MatDialogModule,
    NgxBarcode6Module,
    LoyaltyModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: LanguageService,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService, SettingsService], multi: true
    },
    {
      provide: LOCALE_ID,
      deps: [TokenStorage],
      useFactory: LocaleIdFactory
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
