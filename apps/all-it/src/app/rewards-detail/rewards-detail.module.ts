import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardDetailsComponent, RewardDetailsModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: RewardDetailsComponent
}];

@NgModule({
  imports: [
    RewardDetailsModule,
    RouterModule.forChild(routes)
  ]
})
export class RewardsDetailModule { }
