import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadGraphicComponent } from './upload-graphic.component';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import {ImagesPreviewModule} from '@cl-shared/components/images-preview/images-preview.module';

@NgModule({
  declarations: [
    UploadGraphicComponent
  ],
  exports: [
    UploadGraphicComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    ImagesPreviewModule
  ]
})
export class UploadGraphicModule { }
