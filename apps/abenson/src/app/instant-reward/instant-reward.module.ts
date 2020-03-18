import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstantRewardRoutingModule } from './instant-reward-routing.module';
import { RewardsModule } from '@perxtech/core';
import { RewardComponent } from './reward/reward.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [RewardComponent],
  imports: [
    CommonModule,
    RewardsModule,
    MatButtonModule,
    InstantRewardRoutingModule
  ]
})
export class InstantRewardModule { }
