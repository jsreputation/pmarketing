import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadLinkComponent } from './download-link.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    DownloadLinkComponent
  ],
  exports: [DownloadLinkComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule
  ]
})
export class DownloadLinkModule {
}
