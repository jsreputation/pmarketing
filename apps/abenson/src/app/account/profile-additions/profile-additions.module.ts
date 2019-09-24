import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAdditionsRoutingModule } from './profile-additions-routing.module';
import { TermsAndConditionComponent } from './containers/terms-and-condition/terms-and-condition.component';
import { FaqComponent } from './containers/faq/faq.component';
import { PrivacyPolicyComponent } from './containers/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [FaqComponent, PrivacyPolicyComponent, TermsAndConditionComponent],
  imports: [
    CommonModule,
    ProfileAdditionsRoutingModule
  ]
})
export class ProfileAdditionsModule { }
