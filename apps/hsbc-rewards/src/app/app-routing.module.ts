import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard } from 'ngx-auth';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./details/details.module').then(mod => mod.DetailsModule)
  }, {
    path: 'faq',
    loadChildren: () => import('./account/redeem/redeem.module').then(mod => mod.RedeemModule),
  }, {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then(mod => mod.TermsAndConditionsModule)
  }, {
    path: 'voucher',
    loadChildren: () => import('./wallet/voucher-detail/voucher-detail.module').then(mod => mod.VoucherDetailModule)
  }, {
    path: '',
    loadChildren: () => import('./header/header.module').then(mod => mod.HeaderModule),
    canActivate: [ProtectedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
