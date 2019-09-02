import { of } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  AuthenticationModule,
  GameModule,
  UtilsModule,
  RewardsService,
  VouchersService,
  CampaignService,
  // StampService,
  // LoyaltyService,
  // SurveyService
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

const rewardsServiceStub = {
  getReward: () => of(rewards[0]),
  getAllRewards: () => of(rewards),
  getAllCatalogs: () => of(catalogs),
  getCatalog: (id: number) => of(catalogs[id]),
  reserveReward: () => of(vouchers[1])
};

const vouchersServiceStub = {
  getAll: () => of(vouchers),
  get: (id: number) => of(vouchers[id])
};

const campaignServiceStub = {
  getCampaigns: () => of(campaigns)
};

// const stampServiceStub = {
//   getStamps: () => of(stamps)
// };

// const loyaltyServiceStub = {
//   getLoyalties: () => of(loyalties),
//   getLoyalty: () =>  of(loyalties[1])
// };

// const surveyServiceStub = {
//   getSurvey: () => of(survey)
// };
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RedeemComponent,
    LoadingComponent,
    VoucherDetailComponent,
    AccountComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule.forRoot({ env: environment }),
    AuthenticationModule.forRoot({ env: environment }),
    GameModule.forRoot({ env: environment }),
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
    UtilsModule
  ],
  providers: [
    { provide: RewardsService, useValue: rewardsServiceStub },
    { provide: VouchersService, useValue: vouchersServiceStub },
    { provide: CampaignService, useValue: campaignServiceStub },
    // { provide: StampService, useValue: stampServiceStub },
    // { provide: LoyaltyService, useValue: loyaltyServiceStub },
    // { provide: SurveyService, useValue: surveyServiceStub },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
