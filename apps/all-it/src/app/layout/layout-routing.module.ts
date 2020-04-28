import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@perxtech/blackcomb-pages';
import { WalletGuard } from '../wallet.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', loadChildren: () => import('../home/home.module').then((mod) => mod.HomeModule) },
      { path: 'wallet', loadChildren: () => import('../wallet/wallet.module').then((mod) => mod.WalletModule), canActivate: [WalletGuard] },
      {
        path: 'voucher-detail/:id',
        loadChildren: () => import('../voucher-detail/voucher-detail.module').then((mod) => mod.VoucherDetailModule)
      },
      { path: 'history', loadChildren: () => import('../history/history.module').then((mod) => mod.HistoryModule) },
      { path: 'pi', loadChildren: () => import('../pi/pi.module').then((mod) => mod.PiModule) },
      {
        path: 'redeem/:id', loadChildren: () => import('../redeem/redeem.module').then((mod) => mod.RedeemModule),
      },
      {
        path: 'qr',
        loadChildren: () => import('../qr/qr.module').then((mod) => mod.QRModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then((mod) => mod.AccountModule)
      },
      {
        path: 'stamp/:id',
        loadChildren: () => import('../stamp/stamp.module').then((mod) => mod.StampModule),
      },
      {
        path: 'survey/:id',
        loadChildren: () => import('../survey/survey.module').then((mod) => mod.SurveyModule),
      },
      {
        path: 'game/:id',
        loadChildren: () => import('../game/game.module').then((mod) => mod.GameModule),
      },
      {
        path: 'give_reward/:id',
        loadChildren: () => import('../instant-reward/instant-reward.module').then((mod) => mod.InstantRewardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((mod) => mod.ProfileModule)
      },
      {
        path: 'transaction-history',
        loadChildren: () => import('../transaction-history/transaction-history.module').then((mod) => mod.TransactionHistoryModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('../change-password/change-password.module')
          .then((mod) => mod.ChangePasswordModule)
      },
      {
        path: 'barcode',
        loadChildren: () => import('../barcode/barcode.module').then((mod) => mod.BarcodeModule)
      },
      {
        path: 'edit-profile/:type',
        loadChildren: () => import('../edit-profile-field/edit-profile-field.module').then((mod) => mod.EditProfileFieldModule)
      },
      {
        path: 'reward-detail/:id',
        loadChildren: () => import('../rewards-detail/rewards-detail.module').then((mod) => mod.RewardsDetailModule)
      },
      {
        path: 'booking/:id',
        loadChildren: () => import('../rewards-booking/rewards-booking.module').then((mod) => mod.RewardsBookingModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
