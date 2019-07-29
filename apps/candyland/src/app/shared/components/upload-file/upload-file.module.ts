import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadFileComponent} from './upload-file.component';
import {DownloadButtonModule} from '@cl-shared/components/download-button/download-button.module';

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  exports: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    DownloadButtonModule
  ]
})
export class UploadFileModule {
}
