import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudienceRoutingModule } from './audience-routing.module';
import { AudienceComponent } from './audience.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [AudienceComponent],
  imports: [
    CommonModule,
    AudienceRoutingModule,
    UnderConstructionModule
  ]
})
export class AudienceModule { }
