import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLineProgressComponent } from './custom-line-progress.component';

@NgModule({
  declarations: [CustomLineProgressComponent],
  exports: [
    CustomLineProgressComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomLineProgressModule { }
