import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphicWrapDialogComponent } from './select-graphic-wrap-dialog.component';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { ReactiveFormsModule } from '@angular/forms';
import {UploadGraphicExtModule} from '@cl-shared/components/upload-graphi-plus-ext/upload-graphi-plus-ext.module';
import {MultiUploadDialogModule} from '@cl-shared/components/multi-upload-dialog/multi-upload-dialog.module';

@NgModule({
  declarations: [
    SelectGraphicWrapDialogComponent
  ],
  exports: [
    SelectGraphicWrapDialogComponent
  ],
  imports: [
    CommonModule,
    ImagesPreviewModule,
    UploadGraphicModule,
    UploadGraphicExtModule,
    SelectGraphicModule,
    ReactiveFormsModule,
    MultiUploadDialogModule
  ]
})
export class SelectGraphicWrapDialogModule { }
