import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: '', component: OverviewComponent, children: [
      { path: '', redirectTo: 'rewards' },
      { path: 'rewards', loadChildren: () => import('./rewards/rewards.module').then(m => m.RewardsModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'impressions', loadChildren: () => import('./impressions/impressions.module').then(m => m.ImpressionsModule) },
      { path: 'revenue', loadChildren: () => import('./revenue/revenue.module').then(m => m.RevenueModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
