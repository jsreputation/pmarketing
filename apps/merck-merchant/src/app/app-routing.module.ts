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
import { UserSignupComponent } from './user-signup/user-signup.component';
import { IdentifyCustomerComponent } from './identify-customer/identify-customer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'qrscanner/:path', component: QrscannerComponent },
      { path: 'order', component: OrderComponent },
      { path: 'redeem', component: RedeemComponent },
      { path: 'transaction-history', component: TransactionHistoryComponent },
      { path: 'user-signup', component: UserSignupComponent },
      { path: 'identify-user/:path', component: IdentifyCustomerComponent }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'merchant_admin/validate_reset_password_token', component: ResetPasswordComponent },
  { path: 'dashboard/merchant_user_account_invitations/accept', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
