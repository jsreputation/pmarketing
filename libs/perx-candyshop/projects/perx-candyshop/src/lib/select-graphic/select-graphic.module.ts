import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphicComponent } from './select-graphic.component';
import { UploadGraphicModule } from '../upload-graphic/upload-graphic.module';
import { ImagesPreviewModule } from '../images-preview/images-preview.module';

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
    UploadGraphicModule,
  ]
})
export class SelectGraphicModule { }
