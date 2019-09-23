import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ChangeBarangayComponent } from './change-barangay/change-barangay.component';
import { ChangeStreetAddressComponent } from './change-street-address/change-street-address.component';
import { ChangeCityComponent } from './change-city/change-city.component';

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
    path: 'change-city',
    component: ChangeCityComponent
  },
  {
    path: 'edit-street',
    component: ChangeStreetAddressComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
