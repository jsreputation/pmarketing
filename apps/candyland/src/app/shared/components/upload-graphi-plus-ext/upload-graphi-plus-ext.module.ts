import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import {UploadGraphicExtComponent} from '@cl-shared/components/upload-graphi-plus-ext/upload-graphi-plus-ext.component';

@NgModule({
  declarations: [
    UploadGraphicExtComponent
  ],
  exports: [
    UploadGraphicExtComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule
  ]
})
export class UploadGraphicExtModule { }
