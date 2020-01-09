import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DownloadButtonComponent, DownloadIconDirective } from './download-button.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    DownloadButtonComponent,
    DownloadIconDirective
  ],
  exports: [
    DownloadButtonComponent,
    DownloadIconDirective
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
