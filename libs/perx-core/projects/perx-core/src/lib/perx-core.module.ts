import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { PinInputComponent } from './pin-input/pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule];

@NgModule({
  declarations: [
    PinInputComponent
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ...modules,
    PinInputComponent
  ]
})
export class PerxCoreModule {}
