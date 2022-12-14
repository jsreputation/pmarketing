import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardDetailRoutingModule } from './reward-detail-routing.module';
import { RewardDetailComponent } from './reward-detail.component';
import { RewardsModule, VouchersModule, ConfigModule, MerchantsModule } from '@perxtech/core';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [RewardDetailComponent],
  imports: [
    ConfigModule.forChild(),
    CommonModule,
    RewardDetailRoutingModule,
    MerchantsModule,
    RewardsModule,
    VouchersModule,
    DetailHeaderModule,
    SharedModule
  ]
})
export class RewardDetailModule { }
