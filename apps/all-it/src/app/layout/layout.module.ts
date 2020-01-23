import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import {
  HistoryComponent,
  RedeemComponent,
  VoucherDetailComponent,
  RewardDetailsComponent,
  ContentComponent,
  LayoutComponent,
  SignInComponent,
  RewardsBookingComponent
} from '@perx/blackcomb-pages';
import { HomeModule } from '../home/home.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VouchersModule, RewardsModule, GameModule, LocationModule } from '@perx/core';
import { WalletModule } from '../wallet/wallet.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    LayoutComponent,
    HistoryComponent,
    RedeemComponent,
    VoucherDetailComponent,
    RewardDetailsComponent,
    ContentComponent,
    SignInComponent,
    RewardsBookingComponent
  ],
  imports: [
    // LayoutRoutingModule must be listed first to use its '' routing paths
    LayoutRoutingModule,
    WalletModule,
    CommonModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    VouchersModule,
    RewardsModule,
    GameModule,
    SharedModule,
    TranslateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    LocationModule,
    InfiniteScrollModule
  ]
})
export class LayoutModule { }
