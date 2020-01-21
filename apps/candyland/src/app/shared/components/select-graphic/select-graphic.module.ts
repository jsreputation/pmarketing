import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphicComponent } from './select-graphic.component';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';

@NgModule({
  declarations: [
    SelectGraphicComponent
  ],
  exports: [
    SelectGraphicComponent
  ],
  imports: [
    CommonModule,
    ImagesPreviewModule,
    UploadGraphicModule
  ]
})
export class SelectGraphicModule { }
