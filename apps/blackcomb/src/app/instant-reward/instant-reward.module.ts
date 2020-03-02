import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstantRewardRoutingModule } from './instant-reward-routing.module';
import { RewardsModule, OutcomeModule } from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { RewardComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';

@NgModule({
  imports: [
    CommonModule,
    RewardsModule,
    MatButtonModule,
    InstantRewardRoutingModule,
    OutcomeModule,
    PerxBlackcombPagesModule
  ]
})
export class InstantRewardModule { }
