import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RewardsListPageComponent} from './containers/rewards-list-page/rewards-list-page.component';

const routes: Routes = [
  {path: '',
    component: RewardsListPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule { }
