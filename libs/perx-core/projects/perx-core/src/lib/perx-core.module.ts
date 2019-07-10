import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { PinInputComponent } from './pin-input/pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup/popup.component';

import { MatDialogModule, MatButtonModule } from '@angular/material';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule];

@NgModule({
  declarations: [
    PinInputComponent,
    PopupComponent
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ...modules,
    PinInputComponent,
    PopupComponent
  ]
})
export class PerxCoreModule {}
