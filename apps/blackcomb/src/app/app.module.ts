import { of, from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  AuthenticationModule,
  GameModule,
  UtilsModule,
  ProfileModule,
  RewardsService,
  IVoucherService,
  ProfileService,
  ConfigModule,
  ICampaignService,
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
  MatProgressSpinnerModule
} from '@angular/material';

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
import { rewards } from './mock/rewards.mock';
import { vouchers } from './mock/vouchers.mock';
import { catalogs } from './mock/catalogs.mock';
import { campaigns } from './mock/campaigns.mock';
import { profile } from './mock/profile.mock';
import { RewardComponent } from './reward/reward.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TncComponent } from './tnc/tnc.component';

const rewardsServiceStub = {
  getReward: () => of(rewards[0]),
  getAllRewards: () => of(rewards),
  getAllCatalogs: () => of(catalogs),
  getCatalog: (id: number) => from(catalogs.filter(catalog => catalog.id === id)),
  reserveReward: () => of(vouchers[1])
};

const vouchersServiceStub = {
  getAll: () => of(vouchers),
  get: (id: number) => from(vouchers.filter(voucher => voucher.id === id))
};

const campaignServiceStub = {
  getCampaigns: () => of(campaigns),
  getCampaign: (id: number) => from(campaigns.filter(campaign => campaign.id === id))
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
    RewardComponent,
    ContactUsComponent,
    TncComponent
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
    RewardsModule,
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
    UtilsModule
  ],
  providers: [
    { provide: RewardsService, useValue: rewardsServiceStub },
    { provide: IVoucherService, useValue: vouchersServiceStub },
    { provide: ICampaignService, useValue: campaignServiceStub },
    { provide: ProfileService, useValue: profileServiceStub }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
