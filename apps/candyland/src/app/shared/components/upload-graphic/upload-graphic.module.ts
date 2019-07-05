import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadGraphicComponent } from './upload-graphic.component';
import { MatIconModule } from '@angular/material';

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
  ]
})
export class UploadGraphicModule { }
