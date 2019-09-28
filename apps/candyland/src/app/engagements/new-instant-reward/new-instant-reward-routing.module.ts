import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  NewInstantRewardManagePageComponent
} from './containers/new-instant-reward-manage-page/new-instant-reward-manage-page.component';

const routes: Routes = [
  {
    path: '',
    component: NewInstantRewardManagePageComponent
  },
  {
    path: ':id',
    component: NewInstantRewardManagePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewInstantRewardRoutingModule {
}
