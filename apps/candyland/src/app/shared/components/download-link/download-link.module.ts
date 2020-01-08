import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadLinkComponent } from './download-link.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { ButtonModule } from '@perx/candyshop';
import { PipesModule } from '@cl-shared/pipes/pipes.module';

@NgModule({
  declarations: [DownloadLinkComponent],
  exports: [DownloadLinkComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    PipesModule,
    ButtonModule
  ]
})
export class DownloadLinkModule { }
