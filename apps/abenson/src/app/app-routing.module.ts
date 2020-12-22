import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((mod) => mod.HomeModule),
        canActivate: [ProtectedGuard],
      },
      { path: 'promos', component: PromosComponent },
      {
        path: 'wallet',
        loadChildren: (): any =>
          import('./wallet/wallet.module').then((mod: any) => mod.WalletModule),
      },
      { path: 'history', component: HistoryComponent },
      {
        path: 'account',
        loadChildren: (): any =>
          import('./account/account.module').then(
            (mod: any) => mod.AccountModule
          ),
      },
      {
        path: 'redeem/:id',
        loadChildren: () =>
          import('./redeem/redeem.module').then((mod) => mod.RedeemModule),
      },
      {
        path: 'game/:id',
        loadChildren: (): any =>
          import('./game/game.module').then((mod: any) => mod.GameModule),
      },
      {
        path: 'stamp/:id',
        loadChildren: (): any =>
          import('./stamp/stamp.module').then((mod: any) => mod.StampModule),
      },
      {
        path: 'survey/:id',
        loadChildren: (): any =>
          import('./survey/survey.module').then((mod: any) => mod.SurveyModule),
      },
      {
        path: 'reward',
        loadChildren: (): any =>
          import('./instant-reward/instant-reward.module').then(
            (mod: any) => mod.InstantRewardModule
          ),
      },
      {
        path: 'card',
        loadChildren: () =>
          import('./card/card.module').then((mod) => mod.CardModule),
      },
      {
        path: 'reward-detail/:id',
        loadChildren: (): any =>
          import('./rewards/rewards.module').then(
            (mod: any) => mod.RewardsModule
          ),
      },
      {
        path: 'voucher-detail/:id',
        loadChildren: () =>
          import('./voucher-detail/voucher-detail.module').then(
            (mod) => mod.VoucherDetailModule
          ),
        canActivate: [ProtectedGuard],
      },
      {
        path: 'c',
        loadChildren: () =>
          import('./account/profile-additions/profile-additions.module').then(
            (mod) => mod.ProfileAdditionsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((mod) => mod.ProfileModule),
      },
    ],
    canActivate: [ProtectedGuard],
  },
  { path: 'forgot-pin', component: ForgotPinComponent },
  { path: 'sms-validation', component: SmsValidationComponent },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [PublicGuard] },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
