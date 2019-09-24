import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileAdditionsRoutingModule } from './profile-additions-routing.module';
import { FaqComponent } from './containers/faq/faq.component';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    ProfileAdditionsRoutingModule
  ]
})
export class ProfileAdditionsModule { }
