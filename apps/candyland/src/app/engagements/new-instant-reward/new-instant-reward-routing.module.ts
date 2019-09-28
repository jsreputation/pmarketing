import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewInstantRewardComponent } from './containers/new-instant-reward/new-instant-reward.component';
import {
  NewInstantRewardAppearancePageComponent
} from './containers/new-instant-reward-appearance-page/new-instant-reward-appearance-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'appearance' },
  {
    path: '',
    component: NewInstantRewardComponent,
    children: [
      {
        path: 'appearance',
        component: NewInstantRewardAppearancePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewInstantRewardRoutingModule {
}
