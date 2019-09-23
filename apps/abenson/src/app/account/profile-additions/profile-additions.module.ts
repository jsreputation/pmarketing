import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAdditionsRoutingModule } from './profile-additions-routing.module';
import { TermsAndConditionComponent } from './containers/terms-and-condition/terms-and-condition.component';

@NgModule({
  declarations: [TermsAndConditionComponent],
  imports: [
    CommonModule,
    ProfileAdditionsRoutingModule
  ]
})
export class ProfileAdditionsModule { }
