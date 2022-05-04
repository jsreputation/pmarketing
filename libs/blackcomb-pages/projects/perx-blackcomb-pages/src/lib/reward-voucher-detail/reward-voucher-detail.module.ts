import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import {
  ConfigModule,
  LoyaltyModule, PipeUtilsModule,
  RewardsModule,
  UtilsModule,
  VouchersModule
} from '@perxtech/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { RewardVoucherDetailComponent } from './reward-voucher-detail.component';
import { MatIconModule } from '@angular/material/icon';

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
    UtilsModule,
    PipeUtilsModule,
    MatIconModule
  ]
})
export class RewardVoucherDetailModule { }
