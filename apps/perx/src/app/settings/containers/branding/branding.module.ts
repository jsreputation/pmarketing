import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandingRoutingModule } from './branding-routing.module';
import { BrandingComponent } from './branding.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [BrandingComponent],
  imports: [
    CommonModule,
    BrandingRoutingModule,
    UnderConstructionModule
  ]
})
export class BrandingModule { }
