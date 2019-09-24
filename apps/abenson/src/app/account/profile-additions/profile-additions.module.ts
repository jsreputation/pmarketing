import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAdditionsRoutingModule } from './profile-additions-routing.module';
import { TermsAndConditionComponent } from './containers/terms-and-condition/terms-and-condition.component';
import { FaqComponent } from './containers/faq/faq.component';

@NgModule({
  declarations: [FaqComponent, TermsAndConditionComponent],
  imports: [
    CommonModule,
    ProfileAdditionsRoutingModule
  ]
})
export class ProfileAdditionsModule { }
