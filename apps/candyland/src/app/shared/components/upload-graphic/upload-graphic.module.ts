import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadGraphicComponent } from './upload-graphic.component';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule
  ]
})
export class UploadGraphicModule { }
