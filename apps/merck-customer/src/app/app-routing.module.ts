import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProtectedGuard } from 'ngx-auth';
import { UserInfoComponent } from './user-info/user-info.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { FindPharmacyComponent } from './find-pharmacy/find-pharmacy.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { RedeemComponent } from './redeem/redeem.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './account/profile/profile.component';
import { TransactionHistoryComponent } from './account/transaction-history/transaction-history.component';
import { PrivacyPolicyComponent } from './account/privacy-policy/privacy-policy.component';
import { ConditionComponent } from './account/condition/condition.component';
import { LanguageComponent } from './account/language/language.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'user-info', component: UserInfoComponent },
      { path: 'home', component: HomeComponent },
      { path: 'reward-detail/:rewardId', component: RewardDetailComponent },
      { path: 'redeem/:rewardId', component: RedeemComponent },
      { path: 'qr', loadChildren: () => import('./qr/qr.module').then(mod => mod.QRModule) },
      { path: 'find-pharmacy', component: FindPharmacyComponent },
      { path: 'account', component: AccountComponent },
      { path: 'account/profile', component: ProfileComponent },
      { path: 'account/transaction-history', component: TransactionHistoryComponent },
      { path: 'account/privacy-policy', component: PrivacyPolicyComponent },
      { path: 'account/condition', component: ConditionComponent },
      { path: 'account/language', component: LanguageComponent }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'enter-pin/:type', component: EnterPinComponent },
  {
    path: 'c/:key',
    loadChildren: () => import('./content/content.module').then(mod => mod.ContentModule)
  },
  { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
