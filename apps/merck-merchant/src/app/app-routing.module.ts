import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import { ProtectedGuard } from 'ngx-auth';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { OrderComponent } from './order/order.component';
import { RedeemComponent } from './redeem/redeem.component';
import { RegisterComponent } from './register/register.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'qrscanner/:path', component: QrscannerComponent },
      { path: 'order', component: OrderComponent },
      { path: 'redeem', component: RedeemComponent },
      { path: 'transaction-history', component: TransactionHistoryComponent }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'dashboard/merchant_user_account_invitations/accept', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
