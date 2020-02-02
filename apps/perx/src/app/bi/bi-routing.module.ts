import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiComponent } from './bi.component';

const routes: Routes = [
  {
    path: '', component: BiComponent, children: [
      { path: 'overview', loadChildren: () => import('./containers/overview/overview.module').then(m => m.OverviewModule) },
      { path: 'rewards', loadChildren: () => import('./containers/rewards/rewards.module').then(m => m.RewardsModule) },
      { path: 'merchants', loadChildren: () => import('./containers/merchants/merchants.module').then(m => m.MerchantsModule) },
      { path: 'loyalties', loadChildren: () => import('./containers/loyalties/loyalties.module').then(m => m.LoyaltiesModule) },
      { path: 'campaigns', loadChildren: () => import('./containers/campaigns/campaigns.module').then(m => m.CampaignsModule) },
      { path: '', redirectTo: 'overview' },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiRoutingModule { }
