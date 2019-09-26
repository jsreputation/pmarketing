import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { LoadingComponent } from './loading/loading.component';
import { PromosComponent } from './promos/promos.component';
import { SignUpComponent } from './signup/signup.component';
import { WalletComponent } from './wallet/wallet.component';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'loading' },
      { path: 'home', component: HomeComponent },
      { path: 'promos', component: PromosComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'history', component: HistoryComponent },
      {
        path: 'account',
        loadChildren: (): any => import('./account/account.module').then((mod: any) => mod.AccountModule)
      },
      { path: 'redeem/:id', component: RedeemComponent },
      { path: 'voucher-detail/:id', component: VoucherDetailComponent },
      { path: 'game/:id', loadChildren: (): any => import('./game/game.module').then((mod: any) => mod.GameModule) },
      { path: 'stamp/:id', loadChildren: (): any => import('./stamp/stamp.module').then((mod: any) => mod.StampModule) },
      { path: 'survey/:id', loadChildren: (): any => import('./survey/survey.module').then((mod: any) => mod.SurveyModule) },
      {
        path: 'reward',
        loadChildren: (): any => import('./instant-reward/instant-reward.module').then((mod: any) => mod.InstantRewardModule),
      },
      {
        path: 'card',
        loadChildren: () => import('./card/card.module').then(mod => mod.CardModule)
      },
      { path: 'loading', component: LoadingComponent },
      { path: 'qr-code/:id', loadChildren: (): any => import('./qr-code/qr-code.module').then((mod: any) => mod.QRCodeModule) }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'forgot-pin', component: ForgotPinComponent },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [PublicGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
