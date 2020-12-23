import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatIconModule,
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ChangeBarangayComponent } from './change-barangay/change-barangay.component';
import { ChangeStreetAddressComponent } from './change-street-address/change-street-address.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeCityComponent } from './change-city/change-city.component';
import { UtilsModule } from '@perxtech/core';

@NgModule({
  declarations: [
    ProfileComponent,
    ChangeBarangayComponent,
    ChangeStreetAddressComponent,
    ChangeEmailComponent,
    ChangeCityComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule
  ]
})
export class ProfileModule { }
