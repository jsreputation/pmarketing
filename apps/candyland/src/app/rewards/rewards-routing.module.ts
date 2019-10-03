import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ManageRewardsComponent } from 'src/app/rewards/containers/manage-rewards/manage-rewards.component';
import {RewardsListPageComponent} from './containers/rewards-list-page/rewards-list-page.component';
import {RewardDetailPageComponent} from 'src/app/rewards/containers/reward-detail-page/reward-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: RewardsListPageComponent
  },
  {
    path: 'new-reward',
    component: ManageRewardsComponent
  },
  {
    path: 'edit/:id',
    component: ManageRewardsComponent
  },
  {
    path: 'detail/:id',
    component: RewardDetailPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule {
}
