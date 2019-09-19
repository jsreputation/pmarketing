import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';

import { ChangeStreetAddressComponent } from './change-street-address/change-street-address.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },

  {
    path: 'change-street-address',
    component: ChangeStreetAddressComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
