import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardsComponent } from './rewards.component';

const routes: Routes = [
  {
    path: '', component: RewardsComponent, children: [
      { path: '', redirectTo: 'issued' },
      { path: 'issued', loadChildren: () => import('./issued/issued.module').then(m => m.IssuedModule) },
      { path: 'views', loadChildren: () => import('./views/views.module').then(m => m.ViewsModule) },
      { path: 'redeemed', loadChildren: () => import('./redeemed/redeemed.module').then(m => m.RedeemedModule) },
      { path: 'revenue', loadChildren: () => import('./revenue/revenue.module').then(m => m.RevenueModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule { }
