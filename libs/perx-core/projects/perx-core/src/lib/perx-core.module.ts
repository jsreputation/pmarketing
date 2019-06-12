import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { PinInputComponent } from './pin-input/pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';

const modules = [
  VouchersModule
];

@NgModule({
  declarations: [
    PinInputComponent,
    ShakeTreeComponent
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    ...modules,
    PinInputComponent,
    ShakeTreeComponent
  ]
})
export class PerxCoreModule { }
