import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAdditionsRoutingModule } from './profile-additions-routing.module';
import { PrivacyPolicyComponent } from './containers/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    ProfileAdditionsRoutingModule
  ]
})
export class ProfileAdditionsModule { }
