import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AuthenticationModule,
  RewardsModule,
  LoyaltyModule,
  VouchersModule,
  MerchantsModule,
  ConfigModule,
  ProfileModule,
  ProfileServiceModule,
  MerchantAdminModule,
  LanguageInterceptor,
  ConfigService,
  TokenStorage,
  AuthenticationService,
  ThemesService,
  IConfig
} from '@perxtech/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { HeaderComponent } from './header/header.component';
import { SalesContactComponent } from './sales-contact/sales-contact.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { OrderComponent } from './order/order.component';
import { OrderQuantityComponent } from './order/order-quantity/order-quantity.component';
import { RedeemComponent } from './redeem/redeem.component';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PerxTranslateLoader } from './custom-translate.service';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionPipe } from './transaction-history/transaction.pipe';
import { TransactionHistoryPipe } from './transaction-history/transaction-history.pipe';
import { tap, switchMap } from 'rxjs/operators';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ErrorComponent } from './error/error.component';

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
    } else {
      console.error('Could not retrieve user token');
    }

    configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'en')),
      switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
    resolve();
  });

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    QrscannerComponent,
    HeaderComponent,
    SalesContactComponent,
    CustomSnackbarComponent,
    OrderComponent,
    OrderQuantityComponent,
    RedeemComponent,
    RegisterComponent,
    TransactionHistoryComponent,
    TransactionPipe,
    TransactionHistoryPipe,
    ErrorComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    ProfileModule,
    ProfileServiceModule.forRoot(),
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    ZXingScannerModule,
    MatSnackBarModule,
    RewardsModule.forRoot(),
    MerchantsModule.forRoot(),
    MerchantAdminModule,
    LoyaltyModule.forRoot(),
    VouchersModule,
    HttpClientModule,
    InfiniteScrollModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: PerxTranslateLoader,
        deps: [HttpClient, ConfigService, TokenStorage]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
    {
      provide: APP_INITIALIZER, useFactory: appInit,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService], multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CustomSnackbarComponent]
})
export class AppModule { }
