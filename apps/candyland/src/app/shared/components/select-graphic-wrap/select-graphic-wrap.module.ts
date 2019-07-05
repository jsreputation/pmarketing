import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphicWrapComponent } from './select-graphic-wrap.component';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectGraphicWrapComponent
  ],
  exports: [
    SelectGraphicWrapComponent
  ],
  imports: [
    CommonModule,
    ImagesPreviewModule,
    UploadGraphicModule,
    SelectGraphicModule,
    ReactiveFormsModule,
  ]
})
export class SelectGraphicWrapModule { }
