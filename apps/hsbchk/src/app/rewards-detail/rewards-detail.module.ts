import { NgModule } from '@angular/core';
import { RewardDetailsComponent, RewardDetailsModule } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';

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
