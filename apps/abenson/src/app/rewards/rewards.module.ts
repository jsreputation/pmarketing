import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { RewardsModule as PerxRewardsModule } from '@perx/core';
import { SharedModule } from '../shared/shared.module';
import { RewardConfirmComponent } from './reward-confirm/reward-confirm.component';

@NgModule({
  declarations: [RewardDetailComponent, RewardConfirmComponent],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    PerxRewardsModule,
    SharedModule
  ],
  entryComponents: [
    RewardConfirmComponent
  ]
})
export class RewardsModule { }
