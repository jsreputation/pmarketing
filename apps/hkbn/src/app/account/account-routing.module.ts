import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AccountComponent } from './containers/account/account.component';
import { UpdateEmailComponent } from './containers/update-email/update-email.component';
import { UpdatePhoneComponent } from './containers/update-phone/update-phone.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';

const routes: Route[] = [
  {
    path: '', component: AccountComponent, data: {
      title: 'My Account'
    }
  },
  {
    path: 'email', component: UpdateEmailComponent, data: {
      title: 'My Account',
      back: true,
      backUrl: '/account'
    }
  },
  {
    path: 'phone', component: UpdatePhoneComponent, data: {
      title: 'My Account',
      back: true,
      backUrl: '/account'
    }
  },
  {
    path: 'password', component: ChangePasswordComponent, data: {
      title: 'My Account',
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
