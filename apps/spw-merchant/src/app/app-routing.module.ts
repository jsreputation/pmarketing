import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { ProtectedGuard } from 'ngx-auth';
import { IdentifyCustomerComponent } from './identify-customer/identify-customer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'transaction-history',
      loadChildren: () => import('./transaction-history/transaction-history.module').then((mod) => mod.TransactionHistoryModule) },
      { path: 'qrscanner/:path', loadChildren: () => import('./qrscanner/qrscanner.module').then((mod) => mod.QrscannerModule) },
      { path: 'redeem', loadChildren: () => import('./redeem/redeem.module').then((mod) => mod.RedeemModule) },
      { path: 'order', loadChildren: () => import('./order/order.module').then((mod) => mod.OrderModule) },
      { path: 'identify-user/:path', component: IdentifyCustomerComponent },
    ],
    canActivate: [ProtectedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
  },
  {
    path: 'dashboard/merchant_user_account_invitations/accept',
    loadChildren: () => import('./register/register.module').then((mod) => mod.RegisterModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then((mod) => mod.ForgotPasswordModule),
  },
  {
    path: 'merchant_admin/validate_reset_password_token',
    loadChildren: () => import('./reset-password/reset-password.module').then((mod) => mod.ResetPasswordModule),
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
