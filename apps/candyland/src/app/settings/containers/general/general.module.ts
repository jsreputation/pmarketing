import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';

@NgModule({
  declarations: [GeneralComponent],
  exports: [GeneralComponent],
  imports: [
    CommonModule
  ]
})
export class GeneralModule { }
