import { BrowserModule } from '@angular/platform-browser';
import {
  // LOCALE_ID,
  NgModule,
  APP_INITIALIZER,
} from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatSnackBarModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatListModule,
  MatSlideToggleModule
} from '@angular/material';
import {
  AuthenticationModule,
  ProfileModule,
  UtilsModule,
  LoyaltyModule,
  RewardsModule,
  LocationModule,
  VouchersModule,
  MerchantsModule,
  ConfigModule,
  TokenStorage,
  ConfigService,
  LanguageInterceptor,
  AuthenticationService
} from '@perx/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { UserInfoComponent } from './user-info/user-info.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { FindPharmacyComponent } from './find-pharmacy/find-pharmacy.component';
import { FilterDialogComponent } from './find-pharmacy/filter-dialog/filter-dialog.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RedeemComponent } from './redeem/redeem.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './account/profile/profile.component';
import { TransactionHistoryComponent } from './account/transaction-history/transaction-history.component';
import { PrivacyPolicyComponent } from './account/privacy-policy/privacy-policy.component';
import { ConditionComponent } from './account/condition/condition.component';
import { TransactionPipe } from './account/transaction-history/transaction.pipe';
import { TransactionHistoryPipe } from './account/transaction-history/transaction-history.pipe';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PerxTranslateLoader } from './custom-translate.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export const setLanguage = (translateService: TranslateService, configService: ConfigService, authService: AuthenticationService) => () => new Promise((resolve) => {
  translateService.setDefaultLang(environment.defaultLang);
  configService.readAppConfig().subscribe(
    () => {
      const token = authService.getAppAccessToken();
      if (!token) {
        authService.getAppToken().subscribe(() => {
        }, (err) => {
          console.error(`Error${  err}`);
        });
      }
    }
  );
  resolve();
});
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserInfoComponent,
    HomeComponent,
    SignupComponent,
    ForgotPasswordComponent,
    EnterPinComponent,
    FindPharmacyComponent,
    CustomSnackbarComponent,
    FilterDialogComponent,
    ResetPasswordComponent,
    CustomSnackbarComponent,
    RewardDetailComponent,
    RedeemComponent,
    AccountComponent,
    ProfileComponent,
    TransactionHistoryComponent,
    PrivacyPolicyComponent,
    ConditionComponent,
    TransactionPipe,
    TransactionHistoryPipe,
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    ProfileModule,
    UtilsModule,
    LoyaltyModule,
    RewardsModule,
    MerchantsModule,
    VouchersModule,
    QRCodeModule,
    LocationModule,
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
    // { provide: LOCALE_ID, useValue: 'zh' },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true},
    { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService, ConfigService, AuthenticationService], multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CustomSnackbarComponent, FilterDialogComponent]
})
export class AppModule { }
