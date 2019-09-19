import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeStreetAddressComponent } from './change-street-address/change-street-address.component';

@NgModule({
  declarations: [ProfileComponent, ChangeStreetAddressComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
