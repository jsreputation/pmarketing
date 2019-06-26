import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RewardsRoutingModule} from './rewards-routing.module';
import {RewardsListPageComponent} from './containers/rewards-list-page/rewards-list-page.component';
import {AddRewardPopupComponent} from './containers/add-reward-popup/add-reward-popup.component';

@NgModule({
  declarations: [
    RewardsListPageComponent,
    AddRewardPopupComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule
  ],
  entryComponents: [
    AddRewardPopupComponent
  ]
})
export class RewardsModule {
}
