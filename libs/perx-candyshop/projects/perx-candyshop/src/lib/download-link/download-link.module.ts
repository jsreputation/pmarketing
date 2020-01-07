import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadLinkButtonDirective, DownloadLinkComponent } from './download-link.component';
import { MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    DownloadLinkComponent,
    DownloadLinkButtonDirective
  ],
  exports: [
    DownloadLinkComponent,
    DownloadLinkButtonDirective
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ButtonModule
  ]
})
export class DownloadLinkModule {
}
