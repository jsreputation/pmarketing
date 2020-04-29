import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigModule, LoyaltyModule, RewardsModule, VouchersModule } from '@perxtech/core';
import { RewardDetailsComponent } from './reward-details.component';

@NgModule({
  declarations: [RewardDetailsComponent],
  exports: [RewardDetailsComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    RewardsModule,
    VouchersModule,
    LoyaltyModule,
    ConfigModule,
    MatButtonModule
  ]
})
export class RewardDetailsModule { }
