import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './no-data.component';

@NgModule({
  declarations: [NoDataComponent],
  exports: [NoDataComponent],
  imports: [
    CommonModule
  ]
})
export class NoDataModule { }
