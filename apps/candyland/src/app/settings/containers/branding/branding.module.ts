import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatSelectModule } from '@angular/material';
import { SettingsMobilePreviewModule } from '../../components/settings-mobile-preview/settings-mobile-preview.module';

@NgModule({
  declarations: [BrandingComponent],
  exports: [BrandingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsMobilePreviewModule,

    MatSelectModule,
    MatCardModule
  ]
})
export class BrandingModule { }
