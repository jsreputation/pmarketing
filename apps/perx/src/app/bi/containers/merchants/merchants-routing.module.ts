import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantsComponent } from './merchants.component';

const routes: Routes = [{ path: '', component: MerchantsComponent }, { path: 'views', loadChildren: () => import('./views/views.module').then(m => m.ViewsModule) }, { path: 'rewards', loadChildren: () => import('./rewards/rewards.module').then(m => m.RewardsModule) }, { path: 'revenue', loadChildren: () => import('./revenue/revenue.module').then(m => m.RevenueModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
