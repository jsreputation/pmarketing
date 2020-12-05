import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LanguageComponent } from './language.component';

@NgModule({
  declarations: [LanguageComponent],
  exports: [LanguageComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class LanguageModule { }
