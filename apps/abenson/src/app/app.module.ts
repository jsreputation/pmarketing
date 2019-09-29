import { of, from } from 'rxjs';
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
  RewardsService,
  IVoucherService,
  ConfigModule,
  ICampaignService
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
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { HistoryComponent } from './history/history.component';
import { PromosComponent } from './promos/promos.component';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { rewards } from './mock/rewards.mock';
import { vouchers } from './mock/vouchers.mock';
import { catalogs } from './mock/catalogs.mock';
import { campaigns } from './mock/campaigns.mock';
import { SignUpComponent } from './auth/signup/signup.component';
import { WalletComponent } from './wallet/wallet.component';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { SmsValidationComponent } from './auth/sms-validation/sms-validation.component';

const rewardsServiceStub = {
  getReward: () => of(rewards[0]),
  getAllRewards: () => of(rewards),
  getAllCatalogs: () => of(catalogs),
  getCatalog: (id: number) => from(catalogs.filter(catalog => catalog.id === id)),
};

const vouchersServiceStub = {
  getAll: () => of(vouchers),
  get: (id: number) => of(vouchers.find(voucher => voucher.id === id)),
  reserveReward: () => of(vouchers[1]),
  redeemVoucher: () => of(null),
  issueReward: () => of()
};

const campaignServiceStub = {
  getCampaigns: () => of(campaigns),
  getCampaign: (id: number) => from(campaigns.filter(campaign => campaign.id === id))
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RedeemComponent,
    LoadingComponent,
    VoucherDetailComponent,
    HistoryComponent,
    PromosComponent,
    SignUpComponent,
    WalletComponent,
    ForgotPinComponent,
    SmsValidationComponent,
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
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
    { provide: RewardsService, useValue: rewardsServiceStub },
    { provide: IVoucherService, useValue: vouchersServiceStub },
    { provide: ICampaignService, useValue: campaignServiceStub }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
