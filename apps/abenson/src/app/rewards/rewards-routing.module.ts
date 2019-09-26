import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';

const routes: Routes = [{
  path: 'detail/:id',
  component: RewardDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule { }
