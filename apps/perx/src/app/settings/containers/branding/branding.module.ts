import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandingRoutingModule } from './branding-routing.module';
import { BrandingComponent } from './branding.component';


@NgModule({
  declarations: [BrandingComponent],
  imports: [
    CommonModule,
    BrandingRoutingModule
  ]
})
export class BrandingModule { }
