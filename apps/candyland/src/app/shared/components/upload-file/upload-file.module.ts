import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  exports: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule
  ]
})
export class UploadFileModule { }
