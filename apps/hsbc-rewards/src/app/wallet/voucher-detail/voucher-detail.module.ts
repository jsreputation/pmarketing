import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherDetailRoutingModule } from './voucher-detail-routing.module';
import { VoucherDetailComponent } from './voucher-detail.component';
import { VouchersModule } from '@perx/core';
import { environment } from 'src/environments/environment';
import { DetailHeaderModule } from 'src/app/details/detail-header/detail-header.module';

@NgModule({
  declarations: [VoucherDetailComponent],
  imports: [
    CommonModule,
    VoucherDetailRoutingModule,
    VouchersModule.forRoot({env: environment}),
    DetailHeaderModule
  ]
})
export class VoucherDetailModule { }
