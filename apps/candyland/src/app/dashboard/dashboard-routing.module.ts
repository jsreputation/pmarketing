import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCampaignPageComponent } from 'src/app/dashboard/containers/dashboard-campaign-page/dashboard-campaign-page.component';
import { DashboardOverviewPageComponent } from 'src/app/dashboard/containers/dashboard-overview-page/dashboard-overview-page.component';
import { DashboardRewardsPageComponent } from 'src/app/dashboard/containers/dashboard-rewards-page/dashboard-rewards-page.component';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview'},
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'overview',
        component: DashboardOverviewPageComponent
      },
      {
        path: 'rewards',
        component: DashboardRewardsPageComponent
      },
      {
        path: 'campaigns',
        component: DashboardCampaignPageComponent
      },
      { path: '**', redirectTo: 'overview'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
