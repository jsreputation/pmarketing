import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudienceRoutingModule } from './audience-routing.module';
import { AudienceComponent } from './audience.component';


@NgModule({
  declarations: [AudienceComponent],
  imports: [
    CommonModule,
    AudienceRoutingModule
  ]
})
export class AudienceModule { }
