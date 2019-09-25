import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ChangeBarangayComponent } from './change-barangay/change-barangay.component';
import { ChangeStreetAddressComponent } from './change-street-address/change-street-address.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeCityComponent } from './change-city/change-city.component';
import { VerificationOtpComponent } from './verification-otp/verification-otp.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'change-barangay',
    component: ChangeBarangayComponent
  },
  {
    path: 'change-email',
    component: ChangeEmailComponent
  },
  {
    path: 'change-city',
    component: ChangeCityComponent
  },
  {
    path: 'change-street',
    component: ChangeStreetAddressComponent
  }, {
    path: 'verify-otp/:type',
    component: VerificationOtpComponent
  }, {
    path: 'edit-mobile',
    loadChildren: () => import('./change-mobile/change-mobile.module').then(mod => mod.ChangeMobileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
