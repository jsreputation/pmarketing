import { ProtectedGuard } from 'ngx-auth';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'wallet' },
      { path: 'home', pathMatch: 'full', redirectTo: 'wallet' },
      {
        path: 'wallet', loadChildren: () => import('../wallet/wallet.module').then(mod => mod.WalletModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'history', loadChildren: () => import('../history/history.module').then(mod => mod.HistoryModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'game/:id',
        loadChildren: () => import('../game/game.module').then(mod => mod.GameModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'voucher-detail/:id',
        loadChildren: () => import('../voucher-detail/voucher-detail.module').then(mod => mod.VoucherDetailModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'redeem/:id', loadChildren: () => import('../redeem/redeem.module').then(mod => mod.RedeemModule),
        canActivate: [ProtectedGuard]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
