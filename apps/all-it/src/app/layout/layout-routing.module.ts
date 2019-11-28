import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeComponent,
  WalletHistoryComponent,
  HistoryComponent,
  RedeemComponent,
  VoucherDetailComponent,
  ContentComponent,
  RewardDetailsComponent,
  LayoutComponent,
  PIComponent
} from '@perx/blackcomb-pages';
import { WalletGuard } from '../wallet.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'wallet', component: WalletHistoryComponent, canActivate: [ WalletGuard ] },
      { path: 'history', component: HistoryComponent },
      { path: 'redeem/:id', component: RedeemComponent },
      { path: 'voucher-detail/:id', component: VoucherDetailComponent },
      { path: 'pi', component: PIComponent },
      {
        path: 'qr', loadChildren: (): any => import('../qr/qr.module').then((mod: any) => mod.QRModule)

      },
      {
        path: 'account', loadChildren: (): any => import('../account/account.module').then((mod: any) => mod.AccountModule)

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
        path: 'profile',
        loadChildren: (): any => import('../profile/profile.module').then((mod: any) => mod.ProfileModule)
      },
      {
        path: 'transaction-history',
        loadChildren: (): any => import('../transaction-history/transaction-history.module')
                      .then((mod: any) => mod.TransactionHistoryModule)
      },
      { path: 'reward-detail/:id', component: RewardDetailsComponent },
      { path: 'c/:key', component: ContentComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
