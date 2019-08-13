import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RewardsListPageComponent} from './containers/rewards-list-page/rewards-list-page.component';
import {NewRewardComponent} from 'src/app/rewards/containers/new-reward/new-reward.component';
import {RewardDetailPageComponent} from 'src/app/rewards/containers/reward-detail-page/reward-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: RewardsListPageComponent
  },
  {
    path: 'new-reward',
    component: NewRewardComponent
  },
  {
    path: 'detail/:id',
    component: RewardDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule {
}
