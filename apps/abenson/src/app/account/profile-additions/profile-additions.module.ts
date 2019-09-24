import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAdditionsRoutingModule } from './profile-additions-routing.module';
import { PrivacyPolicyComponent } from './containers/privacy-policy/privacy-policy.component';
import { FaqComponent } from './containers/faq/faq.component';

@NgModule({
  declarations: [FaqComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    ProfileAdditionsRoutingModule
  ]
})
export class ProfileAdditionsModule { }
