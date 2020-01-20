import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphicComponent } from './select-graphic.component';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';
import {DialogColorSelectorModule} from '@cl-shared/components/dialog-color-selector/dialog-color-selector.module';

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
    DialogColorSelectorModule
  ]
})
export class SelectGraphicModule { }
