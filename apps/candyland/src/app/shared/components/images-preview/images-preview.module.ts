import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesPreviewComponent } from './images-preview.component';
import {DialogPreviewSelectorModule} from '@cl-shared/components/dialog-preview-selector/dialog-preview-selector.module';

@NgModule({
  declarations: [ImagesPreviewComponent],
  exports: [
    ImagesPreviewComponent
  ],
  imports: [
    CommonModule,
    DialogPreviewSelectorModule
  ]
})
export class ImagesPreviewModule { }
