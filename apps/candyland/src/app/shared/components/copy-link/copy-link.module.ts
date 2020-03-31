import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyLinkComponent } from './copy-link.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { ButtonModule } from '@perxtech/candyshop';

@NgModule({
  declarations: [CopyLinkComponent],
  exports: [CopyLinkComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule
  ]
})
export class CopyLinkModule { }
