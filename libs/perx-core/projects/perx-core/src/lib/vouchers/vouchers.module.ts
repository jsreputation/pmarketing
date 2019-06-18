import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VouchersComponent } from './vouchers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { MaterialModule } from '../shared/material.module';
import { VouchersService } from './vouchers.service';
import { BcodeRedemptionComponent } from './bcode-redemption/bcode-redemption.component';

const components = [
  VouchersComponent,
  VoucherComponent,
  BcodeRedemptionComponent
];

@NgModule({
  declarations: [
    ...components,
    BcodeRedemptionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...components
  ],
  providers: [
    VouchersService
  ]
})
export class VouchersModule { }
