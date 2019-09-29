import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class PerxCoreModule {}
