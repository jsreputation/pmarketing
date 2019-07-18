import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@cl-core/guards/auth.guard';
import {MainContainerComponent} from './main-container/main-container.component';
import { LoginComponent } from './auth/containers/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard'},
  { path: '',
    component: MainContainerComponent,
    canActivate: [AuthGuard],
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
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
