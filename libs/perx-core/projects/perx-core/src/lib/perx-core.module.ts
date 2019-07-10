import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule];

@NgModule({
  declarations: [
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ...modules
  ]
})
export class PerxCoreModule {}
