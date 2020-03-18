import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstantRewardRoutingModule } from './instant-reward-routing.module';
import { RewardsModule, OutcomeModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material';
import { RewardComponent } from '@perxtech/blackcomb-pages';

@NgModule({
  declarations: [RewardComponent],
  imports: [
    CommonModule,
    RewardsModule,
    MatButtonModule,
    InstantRewardRoutingModule,
    OutcomeModule
  ]
})
export class InstantRewardModule { }
