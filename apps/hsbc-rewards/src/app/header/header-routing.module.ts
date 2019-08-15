import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [{
      path: 'home',
      loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule)
    }, {
      path: 'wallet',
      loadChildren: () => import('../wallet/wallet.module').then(mod => mod.WalletModule)
    }, {
      path: 'voucher',
      loadChildren: () => import('../wallet/voucher-detail/voucher-detail.module').then(mod => mod.VoucherDetailModule)
    }, {
      path: 'account',
      loadChildren: () => import('../account/account.module').then(mod => mod.AccountModule)
    }, {
      path: '**',
      pathMatch: 'full',
      redirectTo: 'home'
    }],
    canActivate: [ProtectedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
