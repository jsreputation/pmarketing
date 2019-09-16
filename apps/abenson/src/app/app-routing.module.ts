import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { AccountComponent } from './account/account.component';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'loading' },
      { path: 'home', component: HomeComponent },
      { path: 'wallet', component: HomeComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'account', component: AccountComponent },
      { path: 'redeem/:id', component: RedeemComponent },
      { path: 'voucher-detail/:id', component: VoucherDetailComponent },
      { path: 'tap/:id', loadChildren: (): any => import('./tap/tap.module').then((mod: any) => mod.TapModule) },
      { path: 'shake/:id', loadChildren: (): any => import('./shake/shake.module').then((mod: any) => mod.ShakeModule) },
      { path: 'stamp/:id', loadChildren: (): any => import('./stamp/stamp.module').then((mod: any) => mod.StampModule) },
      { path: 'survey/:id', loadChildren: (): any => import('./survey/survey.module').then((mod: any) => mod.SurveyModule) },
      {
        path: 'reward',
        loadChildren: (): any => import('./instant-reward/instant-reward.module').then((mod: any) => mod.InstantRewardModule)
      },
      { path: 'loading', component: LoadingComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
