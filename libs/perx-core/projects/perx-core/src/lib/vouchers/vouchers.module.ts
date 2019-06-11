import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VouchersComponent } from './vouchers.component';
import { VoucherComponent } from './voucher/voucher.component';
import { MaterialModule } from '../shared/material.module';

const components = [
  VouchersComponent,
  VoucherComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ...components
  ]
})
export class VouchersModule { }
