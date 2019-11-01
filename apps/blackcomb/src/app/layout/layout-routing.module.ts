import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeComponent,
  WalletComponent,
  HistoryComponent,
  RedeemComponent,
  VoucherDetailComponent,
  LoadingComponent,
  ContentComponent,
  RewardDetailsComponent,
  LayoutComponent
} from '@perx/blackcomb-pages';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'wallet' },
      { path: 'home', component: HomeComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'redeem/:id', component: RedeemComponent },
      { path: 'voucher-detail/:id', component: VoucherDetailComponent },
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
      { path: 'reward-detail/:id', component: RewardDetailsComponent },
      { path: 'loading', component: LoadingComponent },
      { path: 'c/:key', component: ContentComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
