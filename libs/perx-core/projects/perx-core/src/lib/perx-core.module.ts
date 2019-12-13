import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';
import { MerchantAdminModule } from './merchant-admin/merchant-admin.module';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule, MerchantAdminModule];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class PerxCoreModule {}
