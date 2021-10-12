import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { ProtectedGuard } from 'ngx-auth';
import { IdentifyCustomerComponent } from './identify-customer/identify-customer.component';
import { HomeComponent } from './home/home.component';
import { ReserveOrderItemsComponent } from './sales-record/reserve-order-items/reserve-order-items.component';
import { SelectRecordTypeComponent } from './sales-record/select-record-type/select-record-type.component';
import { CreateRecordComponent } from './sales-record/create-record/create-record.component';
import { OrderSummaryComponent } from './sales-record/order-summary/order-summary.component';
import { OrderGuard } from './order.guard';

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
      { path: 'reserve-order-items', component: ReserveOrderItemsComponent, canActivate: [OrderGuard] },
      { path: 'identify-user/:path', component: IdentifyCustomerComponent },
      { path : 'select-record-type', component: SelectRecordTypeComponent},
      { path: 'create-order', component: CreateRecordComponent, canActivate: [OrderGuard] },
      { path: 'order-summary', component: OrderSummaryComponent, canActivate: [OrderGuard]}
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
