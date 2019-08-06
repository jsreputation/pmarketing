import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardDetailRoutingModule } from './reward-detail-routing.module';
import { RewardDetailComponent } from './reward-detail.component';
import { RewardsModule } from '@perx/core';

@NgModule({
  declarations: [RewardDetailComponent],
  imports: [
    CommonModule,
    RewardDetailRoutingModule,
    RewardsModule
  ]
})
export class RewardDetailModule { }
