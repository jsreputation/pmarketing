import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';

const modules = [
  VouchersModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class PerxCoreModule { }
