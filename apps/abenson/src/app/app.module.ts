import { of, from, throwError } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  AuthenticationModule,
  LoyaltyModule,
  GameModule,
  UtilsModule,
  ProfileModule,
  RewardsService,
  IVoucherService,
  AuthenticationService,
  ProfileService,
  ConfigModule,
  ICampaignService,
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
  MatProgressSpinnerModule
} from '@angular/material';

import { HttpErrorResponse } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { AccountComponent } from './account/account.component';
import { HistoryComponent } from './history/history.component';
import { PromosComponent } from './promos/promos.component';
import { rewards } from './mock/rewards.mock';
import { vouchers } from './mock/vouchers.mock';
import { catalogs } from './mock/catalogs.mock';
import { campaigns } from './mock/campaigns.mock';
import { profile } from './mock/profile.mock';
import { CardComponent } from './card/card.component';
import { NgxBarcodeModule } from 'ngx-barcode';

const rewardsServiceStub = {
  getReward: () => of(rewards[0]),
  getAllRewards: () => of(rewards),
  getAllCatalogs: () => of(catalogs),
  getCatalog: (id: number) => from(catalogs.filter(catalog => catalog.id === id)),
};

const vouchersServiceStub = {
  getAll: () => of(vouchers),
  get: (id: number) => from(vouchers.filter(voucher => voucher.id === id)),
  reserveReward: () => of(vouchers[1])
};

const campaignServiceStub = {
  getCampaigns: () => of(campaigns),
  getCampaign: (id: number) => from(campaigns.filter(campaign => campaign.id === id))
};

const authenticationServiceStub = {
  login: (username, password) => {
    if (username === 'perx' && password === '1234') {
      return of(true);
    }
    return throwError(new HttpErrorResponse({ status: 401 }));
  },
  logout: () => {}
};

const profileServiceStub = {
  whoAmI: () => of(profile)
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RedeemComponent,
    LoadingComponent,
    VoucherDetailComponent,
    AccountComponent,
    HistoryComponent,
    PromosComponent,
    CardComponent
  ],
  imports: [
    ConfigModule.forRoot({...environment}),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
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
    ReactiveFormsModule,
    FormsModule,
    UtilsModule,
    LoyaltyModule,
    NgxBarcodeModule
  ],
  providers: [
    { provide: RewardsService, useValue: rewardsServiceStub },
    { provide: IVoucherService, useValue: vouchersServiceStub },
    { provide: ICampaignService, useValue: campaignServiceStub },
    { provide: AuthenticationService, useValue: authenticationServiceStub },
    { provide: ProfileService, useValue: profileServiceStub }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
