import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { ContentContainerComponent } from './ui/content-container/content-container.component';
import { HomeComponent } from './home/containers/home/home.component';
import { EnlargedQrComponent } from './home/containers/enlarged-qr/enlarged-qr.component';
import { WalletComponent } from './wallet/wallet.component';
import { VoucherDetailsComponent } from './wallet/voucher-details/voucher-details.component';
import { RegistrationComponent } from './auth/containers/registration/registration.component';
import { QrRedemptionComponent } from './wallet/qr-redemption/qr-redemption.component';
import { SmsValidationComponent } from './auth/containers/sms-validation/sms-validation.component';
import { ForgotPasswordComponent } from './auth/containers/forgot-password/forgot-password.component';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '', canActivate: [ProtectedGuard], component: ContentContainerComponent, children: [
      { path: '', component: HomeComponent },
      {
        path: 'qr', component: EnlargedQrComponent, data: {
          cross: true,
          backUrl: ''
        }
      },
      { path: 'history', component: HistoryComponent },
      { path: 'wallet', component: WalletComponent },
      {
        path: 'wallet/:id', children: [
          {
            path: '',
            component: VoucherDetailsComponent, data: {
              back: true,
              backUrl: '/wallet'
            }
          },
          {
            path: 'qrcode', component: QrRedemptionComponent, data: {
              cross: true,
              backUrl: '../',
            }
          },
          {
            path: 'code',
            loadChildren: () => import('./wallet/code-redemption/code-redemption.module').then(mod => mod.CodeRedemptionModule),
            data: {
              back: true,
              backUrl: '../'
            }
          }
        ]
      },
      {
        path: 'reward/:id', loadChildren: () => import('./reward/reward.module').then((m) => m.RewardModule)
      },
      {
        path: 'account', loadChildren: () => import('./account/account.module').then((m) => m.AccountModule)
      }
    ]
  },
  {
    path: 'login',
    canActivate: [PublicGuard],
    component: LoginComponent
  },
  {
    path: 'registration',
    canActivate: [PublicGuard],
    component: RegistrationComponent
  },
  {
    path: 'sms-validation',
    canActivate: [PublicGuard],
    component: SmsValidationComponent
  },
  {
    path: 'forgot-password',
    canActivate: [PublicGuard],
    component: ForgotPasswordComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
