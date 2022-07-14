import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
  LocationModule,
  LocationServiceModule,
  LoyaltyModule,
  MerchantsModule,
  ProfileModule,
  ProfileServiceModule,
  RewardsModule,
  RewardsServiceModule,
  SettingsModule,
  ThemesService,
  TokenStorage,
  UtilsModule,
  VouchersModule
} from '@perxtech/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { PerxTranslateLoader } from './custom-translate.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { switchMap, tap } from 'rxjs/operators';
import { LanguageComponent } from './account/language/language.component';

export const appInit =
  (
    translateService: TranslateService,
    configService: ConfigService,
    authService: AuthenticationService,
    themesService: ThemesService) => () => new Promise((resolve) => {
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
    LanguageComponent,
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
    InstantOutcomeTransactionServiceModule.forRoot(),
    ProfileServiceModule.forRoot(),
    UtilsModule,
    LoyaltyModule.forRoot(),
    RewardsModule,
    RewardsServiceModule.forRoot(),
    MerchantsModule.forRoot(),
    VouchersModule,
    QRCodeModule,
    LocationModule,
    HttpClientModule,
    InfiniteScrollModule,
    LocationServiceModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: PerxTranslateLoader,
        deps: [HttpClient, ConfigService, TokenStorage, HttpBackend]
      }
    }),
    SettingsModule.forRoot({ ...environment })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },
    {
      provide: APP_INITIALIZER, useFactory: appInit,
      deps: [TranslateService, ConfigService, AuthenticationService, ThemesService], multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CustomSnackbarComponent, FilterDialogComponent]
})
export class AppModule { }
