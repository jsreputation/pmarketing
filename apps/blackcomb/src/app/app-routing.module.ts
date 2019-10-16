import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { LoadingComponent } from './loading/loading.component';
import { RewardComponent } from './reward/reward.component';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { ContentComponent } from './content/content.component';
import { WalletComponent } from './wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'wallet' },
      { path: 'home', component: HomeComponent, canActivate: [ProtectedGuard] },
      { path: 'wallet', component: WalletComponent, canActivate: [ProtectedGuard] },
      { path: 'history', component: HistoryComponent, canActivate: [ProtectedGuard] },
      { path: 'redeem/:id', component: RedeemComponent, canActivate: [ProtectedGuard] },
      { path: 'voucher-detail/:id', component: VoucherDetailComponent, canActivate: [ProtectedGuard] },
      {
        path: 'account', loadChildren: (): any => import('./account/account.module').then((mod: any) => mod.AccountModule)
        , canActivate: [ProtectedGuard]
      },
      {
        path: 'stamp/:id',
        loadChildren: (): any => import('./stamp/stamp.module').then((mod: any) => mod.StampModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'survey/:id',
        loadChildren: (): any => import('./survey/survey.module').then((mod: any) => mod.SurveyModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'game/:id',
        loadChildren: (): any => import('./game/game.module').then((mod: any) => mod.GameModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'give_reward/:id',
        loadChildren: (): any => import('./instant-reward/instant-reward.module').then((mod: any) => mod.InstantRewardModule),
        canActivate: [ProtectedGuard]
      },
      { path: 'reward-detail', component: RewardComponent, canActivate: [ProtectedGuard] },
      { path: 'loading', component: LoadingComponent },
      { path: 'c/:key', component: ContentComponent, canActivate: [ProtectedGuard] },
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: '**', redirectTo: '/wallet' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
