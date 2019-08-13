import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

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
  OauthModule,
  CognitoModule,
  ProfileModule,
  UtilsModule,
  LoyaltyModule,
  RewardsModule,
  LocationModule
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
  ],
  imports: [
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
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    AuthenticationModule,
    ProfileModule.forRoot({ env: environment }),
    UtilsModule,
    LoyaltyModule.forRoot({env: environment}),
    RewardsModule.forRoot({ env: environment }),
    QRCodeModule,
    LocationModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'zh-Hans' }],
  bootstrap: [AppComponent],
  entryComponents: [CustomSnackbarComponent, FilterDialogComponent]
})
export class AppModule { }
