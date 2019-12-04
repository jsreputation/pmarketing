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
  SignInComponent
} from '@perx/blackcomb-pages';
import { HomeModule } from '../home/home.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VouchersModule, RewardsModule, GameModule } from '@perx/core';
import { WalletModule } from '../wallet/wallet.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LayoutComponent,
    HistoryComponent,
    RedeemComponent,
    VoucherDetailComponent,
    RewardDetailsComponent,
    ContentComponent,
    SignInComponent,
  ],
  imports: [
    WalletModule,
    CommonModule,
    LayoutRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    VouchersModule,
    RewardsModule,
    GameModule,
    SharedModule,
    TranslateModule
  ]
})
export class LayoutModule { }
