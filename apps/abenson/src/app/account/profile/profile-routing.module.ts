import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ChangeBarangayComponent } from './change-barangay/change-barangay.component';
import { ChangeEmailComponent } from './change-email/change-email.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
