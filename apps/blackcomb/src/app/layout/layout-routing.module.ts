import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@perx/blackcomb-pages';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'wallet' },
      { path: 'home', loadChildren: (): any => import('../home/home.module').then((mod: any) => mod.HomeModule) },
      { path: 'wallet', loadChildren: (): any => import('../wallet/wallet.module').then((mod: any) => mod.WalletModule) },
      { path: 'history', loadChildren: (): any => import('../history/history.module').then((mod: any) => mod.HistoryModule) },
      { path: 'redeem/:id', loadChildren: (): any => import('../redeem/redeem.module').then((mod: any) => mod.RedeemModule) },
      {
        path: 'voucher-detail/:id',
        loadChildren: (): any => import('../voucher-detail/voucher-detail.module').then((mod: any) => mod.VoucherDetailModule)
      },
      {
        path: 'pi', loadChildren: (): any => import('../pi/pi.module').then((mod: any) => mod.PiModule)
      },
      {
        path: 'qr', loadChildren: (): any => import('../qr/qr.module').then((mod: any) => mod.QRModule)
      },
      {
        path: 'account', loadChildren: (): any => import('../account/account.module').then((mod: any) => mod.AccountModule)

      },
      {
        path: 'signup',
        loadChildren: () => import('../sign-up/sign-up.module').then((mod) => mod.SignUpModule)
      },
      {
        path: 'stamp/:id',
        loadChildren: (): any => import('../stamp/stamp.module').then((mod: any) => mod.StampModule),
      },
      {
        path: 'survey/:id',
        loadChildren: (): any => import('../survey/survey.module').then((mod: any) => mod.SurveyModule),
      },
      {
        path: 'game/:id',
        loadChildren: (): any => import('../game/game.module').then((mod: any) => mod.GameModule),
      },
      {
        path: 'give_reward/:id',
        loadChildren: (): any => import('../instant-reward/instant-reward.module').then((mod: any) => mod.InstantRewardModule)
      },
      {
        path: 'reward-detail/:id',
        loadChildren: (): any => import('../rewards-detail/rewards-detail.module').then((mod: any) => mod.RewardsDetailModule)
      },
      {
        path: 'c/:key',
        loadChildren: (): any => import('../content/content.module').then((mod: any) => mod.ContentModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
