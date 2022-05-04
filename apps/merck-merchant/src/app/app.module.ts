import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
  AuthenticationService,
  ConfigModule,
  ConfigService,
  IConfig, InstantOutcomeTransactionServiceModule,
  LanguageInterceptor,
  LoyaltyModule,
  MerchantAdminModule,
  MerchantsModule,
  ProfileModule,
  ProfileServiceModule,
  RewardsModule,
  ThemesService,
  TokenStorage,
  VouchersModule
} from '@perxtech/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { PerxTranslateLoader } from './custom-translate.service';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionPipe } from './transaction-history/transaction.pipe';
import { TransactionHistoryPipe } from './transaction-history/transaction-history.pipe';
import { switchMap, tap } from 'rxjs/operators';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { IdentifyCustomerComponent } from './identify-customer/identify-customer.component';
import { MerchantQrscannerModule } from '@perxtech/bcm-pages';

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
      tap((config: IConfig<void>) => translateService.setDefaultLang(config.defaultLang || 'zh')),
      switchMap(() => authService.getAppToken()),
      switchMap(() => themesService.getThemeSetting())
    ).toPromise().then(() => resolve());
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
    UserSignupComponent,
    IdentifyCustomerComponent
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
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    ZXingScannerModule,
    MatSnackBarModule,
    RewardsModule.forRoot(),
    InstantOutcomeTransactionServiceModule.forRoot(),
    MerchantsModule.forRoot(),
    MerchantAdminModule,
    LoyaltyModule.forRoot(),
    VouchersModule,
    HttpClientModule,
    InfiniteScrollModule,
    MerchantQrscannerModule,
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
