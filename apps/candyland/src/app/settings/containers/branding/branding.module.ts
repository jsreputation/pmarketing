import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { SettingsMobilePreviewModule } from '../../components/settings-mobile-preview/settings-mobile-preview.module';
import { ClColorPickerModule } from '@cl-shared/components/cl-color-picker/cl-color-picker.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';

@NgModule({
  declarations: [BrandingComponent],
  exports: [BrandingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsMobilePreviewModule,
    ClColorPickerModule,
    UploadGraphicModule,

    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class BrandingModule { }
