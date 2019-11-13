import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DownloadButtonComponent } from './download-button.component';
import { ButtonModule } from '../button/button.module';

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
