import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from '@cl-core/guards/auth.guard';
// import { NoAuthGuard } from '@cl-core/guards/no-auth.guard';
import { MainContainerComponent } from './main-container/main-container.component';
import { LoginComponent } from './auth/containers/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/overview'},
  { path: '',
    component: MainContainerComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
      },
      {
        path: 'engagements',
        loadChildren: () => import('./engagements/engagements.module').then(mod => mod.EngagementsModule)
      },
      {
        path: 'campaigns',
        loadChildren: () => import('./campaigns/campaigns.module').then(mod => mod.CampaignsModule)
      },
      {
        path: 'rewards',
        loadChildren: () => import('./rewards/rewards.module').then(mod => mod.RewardsModule)
      },
      {
        path: 'audience',
        loadChildren: () => import('./audience/audience.module').then(mod => mod.AudienceModule)
      },
      {
        path: 'merchants',
        loadChildren: () => import('./merchants/merchants.module').then(mod => mod.MerchantsModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(mod => mod.ReportModule)
      },
      {
        path: 'loyalty',
        loadChildren: () => import('./loyalty/loyalty.module').then(mod => mod.LoyaltyModule)
      }
    ]
  },
  { path: 'login', component: LoginComponent,
    // canActivate: [NoAuthGuard]
  },
  { path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
