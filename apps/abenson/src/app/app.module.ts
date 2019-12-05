import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
} from '@perx/core';
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

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { HistoryComponent } from './history/history.component';
import { PromosComponent } from './promos/promos.component';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { SmsValidationComponent } from './auth/sms-validation/sms-validation.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RedeemComponent,
    LoadingComponent,
    HistoryComponent,
    PromosComponent,
    SignUpComponent,
    ForgotPinComponent,
    SmsValidationComponent,
    PopupComponent
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    MerchantsModule,
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
    LoyaltyModule,
    MatCheckboxModule,
    HttpClientModule,
    CampaignModule,
    RewardsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
  ],
  entryComponents: [PopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
