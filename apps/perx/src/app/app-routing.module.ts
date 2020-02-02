import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: '', redirectTo: 'bi' },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'merchants', loadChildren: () => import('./merchants/merchants.module').then(m => m.MerchantsModule) },
  { path: 'rewards', loadChildren: () => import('./rewards/rewards.module').then(m => m.RewardsModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'campaigns', loadChildren: () => import('./campaigns/campaigns.module').then(m => m.CampaignsModule) },
  { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
  { path: 'catalogues', loadChildren: () => import('./catalogues/catalogues.module').then(m => m.CataloguesModule) },
  { path: 'loyalties', loadChildren: () => import('./loyalties/loyalties.module').then(m => m.LoyaltiesModule) },
  { path: 'rules', loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule) },
  { path: 'bulk', loadChildren: () => import('./bulk-actions/bulk-actions.module').then(m => m.BulkActionsModule) },
  { path: 'bi', loadChildren: () => import('./bi/bi.module').then(m => m.BiModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
