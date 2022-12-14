import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AccountComponent } from './containers/account/account.component';
import { UpdateEmailComponent } from './containers/update-email/update-email.component';
import { UpdatePhoneComponent } from './containers/update-phone/update-phone.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { VerificationOtpComponent } from './containers/verification-otp/verification-otp.component';
import { CheckFormTransferGuard } from '../guards/check-form-transfer.guard';

const routes: Route[] = [
  {
    path: '', component: AccountComponent, data: {
      title: 'MY_ACCOUNT'
    }
  },
  {
    path: 'email', component: UpdateEmailComponent, data: {
      title: 'MY_ACCOUNT',
      back: true,
      backUrl: '/account'
    }
  },
  {
    path: 'verify_token/:id',
    component: VerificationOtpComponent, data: {
      backUrl: '/account',
      back: true,
    },
    canActivate: [CheckFormTransferGuard]
  },
  {
    path: 'phone', component: UpdatePhoneComponent, data: {
      title: 'MY_ACCOUNT',
      back: true,
      backUrl: '/account'
    }
  },
  {
    path: 'password', component: ChangePasswordComponent, data: {
      title: 'MY_ACCOUNT',
      back: true,
      backUrl: '/account'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
