import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphicWrapComponent } from './select-graphic-wrap.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '../images-preview/images-preview.module';
import { UploadGraphicModule } from '../upload-graphic/upload-graphic.module';
import { SelectGraphicModule } from '../select-graphic/select-graphic.module';

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
