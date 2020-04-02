import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HomeModule } from '../home/home.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  VouchersModule,
  RewardsModule,
  GameModule,
  LocationModule,
  GameServiceModule,
  CampaignServiceModule
} from '@perxtech/core';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

import { WalletModule } from '../wallet/wallet.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
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
    InfiniteScrollModule,
    PerxBlackcombPagesModule,
    GameServiceModule.forRoot(),
    CampaignServiceModule.forRoot()
  ]
})
export class LayoutModule { }
