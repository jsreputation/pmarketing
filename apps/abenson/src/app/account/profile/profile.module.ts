import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ChangeBarangayComponent } from './change-barangay/change-barangay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeStreetAddressComponent } from './change-street-address/change-street-address.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ChangeBarangayComponent,
    ChangeStreetAddressComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
