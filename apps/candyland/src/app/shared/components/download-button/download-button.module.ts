import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DownloadButtonComponent} from 'src/app/shared/components/download-button/download-button.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {ButtonModule} from '@cl-shared/components/button/button.module';

@NgModule({
  declarations: [
    DownloadButtonComponent
  ],
  exports: [
    DownloadButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule
  ]
})
export class DownloadButtonModule {
}
