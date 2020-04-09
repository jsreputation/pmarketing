import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherDetailRoutingModule } from './voucher-detail-routing.module';
import { VoucherDetailComponent } from './voucher-detail.component';
import { VouchersModule } from '@perxtech/core';
import { DetailHeaderModule } from '../../details/detail-header/detail-header.module';

@NgModule({
  declarations: [VoucherDetailComponent],
  imports: [
    CommonModule,
    VoucherDetailRoutingModule,
    VouchersModule,
    DetailHeaderModule
  ]
})
export class VoucherDetailModule { }
