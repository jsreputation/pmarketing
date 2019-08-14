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
import { CodeRedemptionComponent } from './wallet/code-redemption/code-redemption.component';
import { SmsValidationComponent } from './auth/containers/sms-validation/sms-validation.component';
import { ForgotPasswordComponent } from './auth/containers/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/auth.guard';

const authRedirect: string = '/';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: ContentContainerComponent, children: [
      {path: '', component: HomeComponent},
      {
        path: 'qr', component: EnlargedQrComponent, data: {
          cross: true,
          backUrl: ''
        }
      },
      {path: 'wallet', component: WalletComponent},
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
            path: 'code', component: CodeRedemptionComponent, data: {
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
    canActivate: [AuthGuard],
    data: {disallowAccess: true, redirectTo: authRedirect},
    component: LoginComponent
  },
  {
    path: 'registration',
    canActivate: [AuthGuard],
    data: {disallowAccess: true, redirectTo: authRedirect},
    component: RegistrationComponent
  },
  {
    path: 'sms-validation',
    canActivate: [AuthGuard],
    data: {disallowAccess: true, redirectTo: authRedirect},
    component: SmsValidationComponent
  },
  {
    path: 'forgot-password',
    canActivate: [AuthGuard],
    data: {disallowAccess: true, redirectTo: authRedirect},
    component: ForgotPasswordComponent
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
