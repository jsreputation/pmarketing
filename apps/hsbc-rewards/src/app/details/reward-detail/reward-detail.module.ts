import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardDetailRoutingModule } from './reward-detail-routing.module';
import { RewardDetailComponent } from './reward-detail.component';
import { RewardsModule } from '@perx/core';
import { DetailHeaderModule } from '../detail-header/detail-header.module';

@NgModule({
  declarations: [RewardDetailComponent],
  imports: [
    CommonModule,
    RewardDetailRoutingModule,
    RewardsModule,
    DetailHeaderModule
  ]
})
export class RewardDetailModule { }
