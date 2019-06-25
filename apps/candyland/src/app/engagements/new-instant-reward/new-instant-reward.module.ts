import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewInstantRewardRoutingModule } from './new-instant-reward-routing.module';
import { NewInstantRewardComponent } from './containers/new-instant-reward/new-instant-reward.component';
import {
  NewInstantRewardAppearancePageComponent
} from './containers/new-instant-reward-appearance-page/new-instant-reward-appearance-page.component';
import {
  NewInstantRewardRewardsPageComponent
} from './containers/new-instant-reward-rewards-page/new-instant-reward-rewards-page.component';

@NgModule({
  declarations: [NewInstantRewardComponent, NewInstantRewardAppearancePageComponent, NewInstantRewardRewardsPageComponent],
  imports: [
    CommonModule,
    NewInstantRewardRoutingModule
  ]
})
export class NewInstantRewardModule {
}
