import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { PinInputComponent } from './pin-input/pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

const modules = [
  VouchersModule
];

@NgModule({
  declarations: [
    PinInputComponent,
    ShakeTreeComponent,
    PopupComponent
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  exports: [
    ...modules,
    PinInputComponent,
    ShakeTreeComponent,
    PopupComponent
  ]
})
export class PerxCoreModule { }
