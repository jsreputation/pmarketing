import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import {
  ProtectedGuard,
  PublicGuard,
} from 'ngx-auth';

import {
  HomeComponent,
  HistoryComponent,
  RedeemComponent,
  LoginComponent,
  PIComponent,
  VoucherDetailComponent,
  RewardDetailsComponent,
  LoadingComponent,
  ContentComponent,
  WalletComponent,
} from '@perx/blackcomb-pages';

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
        path: 'qr', loadChildren: (): any => import('./qr/qr.module').then((mod: any) => mod.QRModule)
        , canActivate: [ProtectedGuard]
      },
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
      { path: 'reward-detail/:id', component: RewardDetailsComponent, canActivate: [ProtectedGuard] },
      { path: 'loading', component: LoadingComponent },
      { path: 'c/:key', component: ContentComponent, canActivate: [ProtectedGuard] },
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'pi', component: PIComponent, canActivate: [PublicGuard] },
  { path: '**', redirectTo: '/wallet' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
