import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { LoginComponent } from './auth/login/login.component';
import { HistoryComponent } from './history/history.component';
import { PromosComponent } from './promos/promos.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { ForgotPinComponent } from './forgot-pin/forgot-pin.component';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { SmsValidationComponent } from './auth/sms-validation/sms-validation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'promos', component: PromosComponent },
      { path: 'wallet', loadChildren: (): any => import('./wallet/wallet.module').then((mod: any) => mod.WalletModule) },
      { path: 'history', component: HistoryComponent },
      {
        path: 'account',
        loadChildren: (): any => import('./account/account.module').then((mod: any) => mod.AccountModule)
      },
      { path: 'redeem/:id', component: RedeemComponent },
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
      { path: 'rewards', loadChildren: (): any => import('./rewards/rewards.module').then((mod: any) => mod.RewardsModule) }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'forgot-pin', component: ForgotPinComponent },
  { path: 'sms-validation', component: SmsValidationComponent },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [PublicGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
