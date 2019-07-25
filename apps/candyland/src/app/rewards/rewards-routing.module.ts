import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RewardsListPageComponent} from './containers/rewards-list-page/rewards-list-page.component';
import {NewRewardComponent} from 'src/app/rewards/containers/new-reward/new-reward.component';


const routes: Routes = [
  {
    path: '',
    component: RewardsListPageComponent
  },
  {
    path: 'new-reward',
    component: NewRewardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule {
}
