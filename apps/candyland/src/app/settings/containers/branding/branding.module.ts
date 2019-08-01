import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding.component';

@NgModule({
  declarations: [BrandingComponent],
  exports: [BrandingComponent],
  imports: [
    CommonModule
  ]
})
export class BrandingModule { }
