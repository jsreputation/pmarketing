import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { PinInputComponent } from './pin-input/pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const modules = [
  VouchersModule
];

@NgModule({
  declarations: [
    PinInputComponent
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ...modules,
    PinInputComponent
  ]
})
export class PerxCoreModule { }
