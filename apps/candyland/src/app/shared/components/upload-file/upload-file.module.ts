import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadFileComponent} from './upload-file.component';
import {DownloadButtonModule} from '@cl-shared/components/download-button/download-button.module';
import {MatButtonModule, MatIconModule} from '@angular/material';

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
    DownloadButtonModule
  ]
})
export class UploadFileModule {
}
