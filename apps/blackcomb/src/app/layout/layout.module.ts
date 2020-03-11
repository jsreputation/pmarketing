import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { HomeModule } from '../home/home.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VouchersModule, RewardsModule, GameModule } from '@perxtech/core';
import { WalletModule } from '../wallet/wallet.module';
import { SharedModule } from '../shared/shared.module';
import { HistoryModule } from '../history/history.module';
import { TranslateModule } from '@ngx-translate/core';
import { RedeemModule } from '../redeem/redeem.module';
import { VoucherDetailModule } from '../voucher-detail/voucher-detail.module';
import { PiModule } from '../pi/pi.module';
import { RewardsDetailModule } from '../rewards-detail/rewards-detail.module';
import { ContentModule } from '../content/content.module';
import { CampaignStampsModule } from '../campaign-stamps/campaign-stamps.module';

@NgModule({
  imports: [
    // LayoutRoutingModule must be listed first to use its '' routing paths
    LayoutRoutingModule,
    HomeModule,
    WalletModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VouchersModule,
    RewardsModule,
    GameModule,
    SharedModule,
    TranslateModule,
    HistoryModule,
    RedeemModule,
    VoucherDetailModule,
    PiModule,
    RewardsDetailModule,
    ContentModule,
    CampaignStampsModule,
    PerxBlackcombPagesModule
  ]
})
export class LayoutModule { }
