import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PinInputComponent } from './pin-input/pin-input.component';

@NgModule({
  declarations: [
    PinInputComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [
    PinInputComponent
  ]
})
export class PerxCoreModule { }
