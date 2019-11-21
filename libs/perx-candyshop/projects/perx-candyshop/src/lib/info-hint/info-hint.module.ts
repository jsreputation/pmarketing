import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoHintComponent } from './info-hint.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    InfoHintComponent
  ],
  exports: [
    InfoHintComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class InfoHintModule { }
