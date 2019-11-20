import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesPreviewComponent } from './images-preview.component';

@NgModule({
  declarations: [ImagesPreviewComponent],
  exports: [
    ImagesPreviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ImagesPreviewModule { }
