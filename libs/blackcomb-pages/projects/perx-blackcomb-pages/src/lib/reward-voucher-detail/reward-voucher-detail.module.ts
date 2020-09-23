import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import {
  ConfigModule,
  LoyaltyModule,
  RewardsModule,
  UtilsModule,
  VouchersModule
} from '@perxtech/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RewardVoucherDetailComponent } from './reward-voucher-detail.component';

@NgModule({
  declarations: [RewardVoucherDetailComponent],
  exports: [RewardVoucherDetailComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    RewardsModule,
    VouchersModule,
    LoyaltyModule,
    ConfigModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    UtilsModule
  ]
})
export class RewardVoucherDetailModule { }
