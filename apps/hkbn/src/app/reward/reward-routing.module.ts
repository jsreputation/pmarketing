import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RewardComponent } from './containers/reward/reward.component';

const routes: Route[] = [
  {path: '', component: RewardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardRoutingModule {
}
