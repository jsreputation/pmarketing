import { ProtectedGuard } from 'ngx-auth';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@perx/blackcomb-pages';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home', loadChildren: (): any => import('../home/home.module').then((mod: any) => mod.HomeModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'wallet', loadChildren: (): any => import('../wallet/wallet.module').then((mod: any) => mod.WalletModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'history', loadChildren: (): any => import('../history/history.module').then((mod: any) => mod.HistoryModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'redeem/:id', loadChildren: (): any => import('../redeem/redeem.module').then((mod: any) => mod.RedeemModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'voucher-detail/:id',
        loadChildren: (): any => import('../voucher-detail/voucher-detail.module').then((mod: any) => mod.VoucherDetailModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'pi', loadChildren: (): any => import('../pi/pi.module').then((mod: any) => mod.PiModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'qr', loadChildren: (): any => import('../qr/qr.module').then((mod: any) => mod.QRModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'account', loadChildren: (): any => import('../account/account.module').then((mod: any) => mod.AccountModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'signup',
        loadChildren: () => import('../sign-up/sign-up.module').then((mod) => mod.SignUpModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'stamp/:id',
        loadChildren: (): any => import('../stamp/stamp.module').then((mod: any) => mod.StampModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'survey/:id',
        loadChildren: (): any => import('../survey/survey.module').then((mod: any) => mod.SurveyModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'game/:id',
        loadChildren: (): any => import('../game/game.module').then((mod: any) => mod.GameModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'give_reward/:id',
        loadChildren: (): any => import('../instant-reward/instant-reward.module').then((mod: any) => mod.InstantRewardModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'reward-detail/:id',
        loadChildren: (): any => import('../rewards-detail/rewards-detail.module').then((mod: any) => mod.RewardsDetailModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'c/:key',
        loadChildren: (): any => import('../content/content.module').then((mod: any) => mod.ContentModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'profile',
        loadChildren: (): any => import('../profile/profile.module').then((mod: any) => mod.ProfileModule)
      },
      {
        path: 'transaction-history',
        loadChildren: (): any => import('../transaction-history/transaction-history.module')
                      .then((mod: any) => mod.TransactionHistoryModule)
      },
      {
        path: 'change-password',
        loadChildren: (): any => import('../change-password/change-password.module')
                      .then((mod: any) => mod.ChangePasswordModule)
      },
      {
        path: 'edit-profile/:type',
        loadChildren: (): any => import('../edit-profile-field/edit-profile-field.module')
                      .then((mod: any) => mod.EditProfileFieldModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
